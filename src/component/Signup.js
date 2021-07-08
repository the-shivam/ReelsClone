import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useContext(AuthContext);
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        let res = await signup(email, password);
        let uid = res.user.uid;
        console.log(uid);
        setLoading(false);
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
                <button type='submit' disabled={loading}>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
