import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login(email, password);
            setLoading(false);
            console.log("Logged In");
        }
        catch {
            setError("Failed to log in");
            setTimeout(() => {
                setError('')
            }, 2000);
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor=''>Email</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor=''>Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' disabled={loading}>Sign in</button>
            </form>
        </div>
    )
}

export default Signin
