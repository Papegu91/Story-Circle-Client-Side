import React from 'react';
import '../Css/HomePage.css';
import {Link } from "react-router-dom"

export default function HomePage() {
  return (
    <>
      <div className="home-page">
        <div className="home-main">
          <div className='text-for-home-page'>
            <h1 className="home-title">Story Circle </h1>
            <p className="home-text">Establish or Discover Your Community.</p>
          </div>
          <div className="home-links">
            <Link to="/signup">Sign Up </Link>
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </>
  );
}
