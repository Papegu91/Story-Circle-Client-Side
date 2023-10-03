import React from "react";
import '../Css/NavBar.css'
import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="nav-items">
            <div className="nav-text">
                <h1 className="text-blue">Story Circle</h1>
            </div>
            <ul>
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink exact to="/clubs">Clubs</NavLink></li>
                <li><NavLink exact to="/books">Books</NavLink></li>
                <li><NavLink exact to="/about">About</NavLink></li>
            </ul>
        </nav>
    )
}