import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { database, storage } from '../firebase';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    },
    button: {
        width: 175,
        color: "white",
        backgroundColor: "#0957c3",
        marginTop: 5,
    },
}));


function Signup() {


    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signup, currentUser } = useContext(AuthContext);
    const history = useHistory();
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid;
            // console.log(uid);
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            /* this uploadTaskListener has has a event listener which takes three callback functions fn1, fn2, fn3
            fn1 = used during the time file is being uploaded
            fn2 = used if any error occurs during uploading
            fn3 = used on completion of upload of the file
            1. 'state_changed' observer, called any time the state changes
            2. Error observer, called on failure
            3. Completion observer, called on successful completion
            fn 1 -> progress tracking
            fn2 -> error
            fn3 -> success */
            uploadTaskListener.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("file uploaded" + progress + '%');
            }
            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('');
                }, 2000);
                setLoading(false);
            }
            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })
                setLoading(false);
                console.log("user has signed Up");
                history.push('/');
            }

        } catch (err) {
            setError(err);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
        }
    }
    const handleFileSubmit = (e) => {
        const file = e.target.files[0];
        if (file != null) {
            setFile(file);
        }
    }

    const handleSignInClick = () => {
        history.push('/login');
    }

    useEffect(() => {
        if (currentUser) {
            history.push('/');
        }
    }, []);

    return (
        <div>
            <form className={classes.root} onSubmit={handleSignup}>
                <div>
                    <TextField id="username" label="Username" type='text' value={name} onChange={(e) => { setName(e.target.value) }} required />
                </div>
                <div>
                    <TextField id="email" label="Email" type='text' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                </div>
                <div>
                    <TextField id="password" label="Password" type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                </div>
                <div>
                    {/* <label htmlFor='profile'>Profile image</label> */}
                    {/* <input type='file' accept='image/*' onChange={handleFileSubmit}></input> */}
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleFileSubmit}
                        hidden
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" size="small" component="span" className={classes.button}
                            startIcon={<CloudUploadIcon />}>
                            Upload
                        </Button>
                    </label>
                </div>
                {/* <button type='submit' disabled={loading}>Sign Up</button> */}
                <Button type='submit' disabled={loading} size="small" variant="contained" className={classes.button}>
                    Sign Up
                </Button>
                <div >Already have an account?<Button onClick={handleSignInClick} style={{ display: 'inline-block', color: '#0957c3' }}>Sign In</Button></div>
            </form>
        </div>
    )
}

export default Signup
