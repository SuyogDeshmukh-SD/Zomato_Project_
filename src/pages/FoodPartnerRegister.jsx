import React from 'react'
import '../styles/vars.css'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const FoodPartnerRegister = () => {
const navigate = useNavigate();
const handleSubmit =async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const ContactName = e.target[1].value;
    const Phone = e.target[2].value;
    const Email = e.target[3].value;
    const Password = e.target[4].value;
    const Address = e.target[5].value;

   const response=  await axios.post("http://localhost:3000/api/auth/food-partner/register",{
     name: name,

        contactName: ContactName,   
        phone: Phone,
        email: Email,
        password: Password,
        address: Address
    },{
        withCredentials: true
    })
    .then((response) => {
        console.log(response.data);
        navigate("/create-food")
    })  .catch((error) => {
        console.log(error   );
    } )  
      

}


    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Partner sign up</h2>
                <p className="auth-sub">Create a food-partner account to list your restaurant.</p>
                <form className="auth-form" onSubmit={function(e) {handleSubmit(e)}}>
                    <input className="auth-input" placeholder="Business name" />
                    <div className="auth-row">
                        <input className="auth-input" placeholder="Contact name" />
                        <input className="auth-input" placeholder="Phone" type="tel" />
                    </div>
                    <input className="auth-input" placeholder="Email" />
                    <input className="auth-input" placeholder="Password" type="password" />
                    <textarea className="auth-input" placeholder="Address" rows={3} style={{ resize: 'vertical' }} />
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>Full address helps customers find you faster.</div>
                    <button className="auth-btn" type="submit">Create Partner Account</button>
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
