import React from 'react'
import '../styles/vars.css'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {
    const navigate = useNavigate();
    const handleSubmit =async (e) => {
e.preventDefault();
        const FullName = e.target[0].value;
        const Email = e.target[1].value;
        const Password = e.target[2].value;
console.log(FullName, Email, Password);

      const responce=  await axios.post("http://localhost:3000/api/auth/user/register",{
            fullName: FullName,
            email: Email,
            password: Password
        },{
            withCredentials: true
        })
        navigate("/")

    }



    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Create your account</h2>
                <p className="auth-sub">Sign up as a user to order delicious meals.</p>
                <form className="auth-form" onSubmit={function(e){handleSubmit(e)}}>
                    <input className="auth-input" placeholder="Full name" />
                    <input className="auth-input" placeholder="Email address" />
                    <input className="auth-input" placeholder="Password" type="password" />
                    <button className="auth-btn" type="submit">Create account</button>
                </form>
                <p className="muted" style={{ marginTop: 12 }}>Already have an account? <a className="auth-link" href="/user/login">Sign in</a></p>
                <div style={{ marginTop: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span className="muted">Or register as:</span>
                    <a className="auth-link" href="/user/register" style={{ marginLeft: 6 }}>User</a>
                    <a className="auth-link" href="/food-partner/register" style={{ marginLeft: 6 }}>Food Partner</a>
                </div>
            </div>
        </div>
    )
}

export default UserRegister
