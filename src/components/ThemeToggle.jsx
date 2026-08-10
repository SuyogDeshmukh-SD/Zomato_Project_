import React, { useEffect, useState } from 'react'

const THEME_KEY = 'theme'

function applyTheme(t) {
    if (t) document.documentElement.setAttribute('data-theme', t)
    else document.documentElement.removeAttribute('data-theme')
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem(THEME_KEY)
        } catch { return null }
    })

    useEffect(() => {
        if (theme) applyTheme(theme)
        else applyTheme(null)
    }, [theme])

    const toggle = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        try { localStorage.setItem(THEME_KEY, next) } catch { }
        setTheme(next)
    }

    const reset = () => {
        try { localStorage.removeItem(THEME_KEY) } catch { }
        setTheme(null)
    }

    return (
        <div className="theme-toggle" aria-hidden>
            <button onClick={toggle} title="Toggle theme">{theme === 'dark' ? '🌙' : '☀️'}</button>
            <button onClick={reset} title="Follow system" style={{ marginLeft: 6 }}>↺</button>
        </div>
    )
}
