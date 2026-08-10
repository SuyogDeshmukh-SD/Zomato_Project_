import React from 'react'
import '../styles/vars.css'
import '../styles/auth.css'
import { Link } from 'react-router-dom'

const RegisterChoice = () => {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Create an account</h2>
                <p className="auth-sub">Choose how you'd like to register.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <Link to="/user/register" className="auth-btn" style={{ textAlign: 'center', background: 'var(--accent)', color: 'var(--accent-contrast)' }}>Register as User</Link>
                    <Link to="/food-partner/register" className="auth-btn" style={{ textAlign: 'center', background: 'transparent', color: 'var(--text)', border: `1px solid var(--border)` }}>Register as Food Partner</Link>
                </div>
                <p className="muted" style={{ marginTop: 12 }}>Already registered? <Link className="auth-link" to="/user/login">Sign in</Link></p>
            </div>
        </div>
    )
}

export default RegisterChoice
