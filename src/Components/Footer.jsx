import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import "../Css/Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-top">
        <div className="footer-column">
          <h3 className="footer-header">Products</h3>
          <ul className="footer-list">
            <li>Custom Bookmarks</li>
            <li>Merchandise</li>
            <li>Our Workshop</li>
            <li>Exclusive Access</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-header">Community</h3>
          <ul className="footer-list">
            <li>MysteryMinds</li>
            <li>GlobalReads</li>
            <li>Poets' Corner</li>
            <li>CampusPages</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-header">Support Center</h3>
          <ul className="footer-list">
            <li>24/7 Assistance</li>
            <li>Terms Of Service</li>
            <li>Privacy & Data</li>
            <li>FAQs</li>
          </ul>
        </div>
      </div>

      <div className="social-icons">
        <div className="social-icon-container">
          <a href="https://www.instagram.com/">
            <FaInstagram size={25} color="orange" />
          </a>
        </div>
        <div className="social-icon-container">
          <a href="https://www.facebook.com/">
            <FaFacebook size={25} color="orange" />
          </a>
        </div>
        <div className="social-icon-container">
          <a href="https://www.linkedin.com/">
            <FaLinkedin size={25} color="orange" />
          </a>
        </div>
        <div className="social-icon-container">
          <a href="https://twitter.com/">
            <FaTwitter size={25} color="orange" />
          </a>
        </div>
      </div>

      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} Story Circle, Inc. All rights
        reserved.
      </p>
    </div>
  );
}
