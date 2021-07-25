import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center'
    },
    button: {
        width: 175,
        color: "white",
        backgroundColor: "#0957c3",
        marginTop: 5,
    }
}));

function Signin() {

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login, currentUser } = useContext(AuthContext);
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login(email, password);
            setLoading(false);
            console.log("Logged In");
            history.push('/');
        }
        catch {
            setError("Failed to log in");
            setTimeout(() => {
                setError('')
            }, 2000);
            setPassword('');
            setLoading(false);
        }
    }

    const handleSignUpClick = () => {
        history.push('/signup');
    }

    useEffect(() => {
        if (currentUser) {
            history.push('/')
        }
    }, []);

    return (
        <div>
            <form className={classes.root} onSubmit={handleSubmit}>
                <div>
                    {/* <label htmlFor=''>Email</label> */}
                    <TextField id="email" label="email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    {/* <label htmlFor=''>Password</label> */}
                    <TextField id="password" label="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button size="small" variant="contained" className={classes.button} type='submit' disabled={loading}>Sign in</Button>
                <div >Don't have account?<Button onClick={handleSignUpClick} style={{ display: 'inline-block', color: '#0957c3' }}>Sign up!</Button></div>
                {
                    error ? <h1>{error}</h1> : <></>
                }
            </form>
        </div>
    )
}

export default Signin
