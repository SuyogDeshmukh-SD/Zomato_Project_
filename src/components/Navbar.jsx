import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
    return (
        <nav className="app-navbar">
            <div className="nav-inner">
                <Link className="nav-brand" to="/">
                    <span className="brand-mark">Z</span>
                    <span style={{ letterSpacing: 0.4 }}>Zomato</span>
                </Link>
                <div style={{ marginLeft: 'auto' }}>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}
