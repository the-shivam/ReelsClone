import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { database, storage } from '../firebase';
function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signup } = useContext(AuthContext);
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid;
            console.log(uid);
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
                console.log("user has signed Up");
            }
            setLoading(false);
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
    return (
        <div>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor=''>Username</label>
                    <input type='text' value={name} onChange={(e) => { setName(e.target.value) }} required></input>
                </div>
                <div>
                    <label htmlFor=''>Email</label>
                    <input type='text' value={email} onChange={(e) => { setEmail(e.target.value) }} required></input>
                </div>
                <div>
                    <label htmlFor=''>Password</label>
                    <input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} required></input>
                </div>
                <div>
                    <label htmlFor='profile'>Profile image</label>
                    <input type='file' accept='image/*' onChange={handleFileSubmit}></input>
                </div>
                <button type='submit' disabled={loading}>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
