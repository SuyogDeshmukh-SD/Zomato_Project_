import React from 'react'
import '../styles/vars.css'
import '../styles/auth.css'

const FoodPartnerRegister = () => {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Partner sign up</h2>
                <p className="auth-sub">Create a food-partner account to list your restaurant.</p>
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <input className="auth-input" placeholder="Business name" />
                    <input className="auth-input" placeholder="Contact email" />
                    <input className="auth-input" placeholder="Password" type="password" />
                    <button className="auth-btn" type="submit">Create account</button>
                </form>
                <p className="muted" style={{ marginTop: 12 }}>Already partnered? <a className="auth-link" href="/food-partner/login">Sign in</a></p>
                <div style={{ marginTop: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span className="muted">Or register as:</span>
                    <a className="auth-link" href="/user/register" style={{ marginLeft: 6 }}>User</a>
                    <a className="auth-link" href="/food-partner/register" style={{ marginLeft: 6 }}>Food Partner</a>
                </div>
            </div>
        </div>
    )
}

export default FoodPartnerRegister
