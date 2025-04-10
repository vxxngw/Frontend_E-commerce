import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareInstagram, faFacebook, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import logoFooter from "../Assets/logo-footer.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Thông tin chính */}
        <div className="footer-content">
          <div className="footer-brand">
            <h2>Colorlib</h2>
          </div>
          <ul className="footer-links">
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Legal</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <div className="footer-social">
            <FontAwesomeIcon icon={faFacebook} id="icon-fb"/>
            <FontAwesomeIcon icon={faTwitter} id="icon-twitter"/>
            <FontAwesomeIcon icon={faSquareInstagram} id="icon-in"/>
            <FontAwesomeIcon icon={faYoutube} id="icon-youtube"/>
          </div>
           {/* Bản quyền */}
      <div className="footer-copyright">
        <p>© Colorlib. All Rights Reserved.</p>
      </div>
        </div>
        {/* Phần logo */}
        <div className="footer-logo">
          <img src={logoFooter} alt="Footer Logo" />
        </div>
      </div>     
    </footer>
  );
};

export default Footer;
