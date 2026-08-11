import React from 'react'
import '../styles/vars.css'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const FoodPartnerLogin = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const Email = e.target[0].value;
        const Password = e.target[1].value;
    const responce=  await axios.post("http://localhost:3000/api/auth/food-partner/login",{
            email: Email,
            password: Password  
    
    
    },{
        withCredentials: true
    })
    .then((response) => {
        console.log(response.data);
        navigate("/create-food")
    })  .catch((error) => {
        console.log(error);
       
    })}
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Partner sign in</h2>
                <p className="auth-sub">Access your partner dashboard and manage listings.</p>
                <form className="auth-form" onSubmit={function(e) {handleSubmit(e)}}>
                    <input className="auth-input" placeholder="Contact email" />
                    <input className="auth-input" placeholder="Password" type="password" />
                    <button className="auth-btn" type="submit">Sign in</button>
                </form>
                <p className="muted" style={{ marginTop: 12 }}>Don't have an account? <a className="auth-link" href="/food-partner/register">Create account</a></p>
                <div style={{ marginTop: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span className="muted">Or register as:</span>
                    <a className="auth-link" href="/user/register" style={{ marginLeft: 6 }}>User</a>
                    <a className="auth-link" href="/food-partner/register" style={{ marginLeft: 6 }}>Food Partner</a>
                </div>
            </div>
        </div>
    )
}

export default FoodPartnerLogin
