import React, { useState } from "react";
import '../Css/NavBar.css'
import { NavLink } from "react-router-dom";

export default function NavBar() {
    const [showLinks, setShowLinks] = useState(false);

    const toggleLinks = () => {
        setShowLinks(!showLinks);
    }

    return (
        <nav className={`nav-items ${showLinks ? 'show' : ''}`}>
            <div className="nav-text">
                <h1>Story Circle</h1>
            </div>
            <div className="toggle" onClick={toggleLinks}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <ul className={`nav-links ${showLinks ? 'show' : ''}`}>
                <li><NavLink to="/" onClick={toggleLinks}>Home</NavLink></li>
                <li><NavLink to="/clubs" onClick={toggleLinks}>Clubs</NavLink></li>
                <li><NavLink to="/books" onClick={toggleLinks}>Books</NavLink></li>
                <li><NavLink to="/about" onClick={toggleLinks}>About</NavLink></li>
            </ul>
        </nav>
    )
}
