import React from 'react'
import '../styles/vars.css'
import '../styles/auth.css'

const UserLogin = () => {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Welcome back</h2>
                <p className="auth-sub">Sign in to continue to your account.</p>
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <input className="auth-input" placeholder="Email address" />
                    <input className="auth-input" placeholder="Password" type="password" />
                    <button className="auth-btn" type="submit">Sign in</button>
                </form>
                <p className="muted" style={{ marginTop: 12 }}>New here? <a className="auth-link" href="/user/register">Create account</a></p>
                <div style={{ marginTop: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span className="muted">Or register as:</span>
                    <a className="auth-link" href="/user/register" style={{ marginLeft: 6 }}>User</a>
                    <a className="auth-link" href="/food-partner/register" style={{ marginLeft: 6 }}>Food Partner</a>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
