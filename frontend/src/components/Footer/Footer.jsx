import React from "react";
import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="top1">
          <h2>FRESHFOODMEAL</h2>
          <div className="lang">
            <select>
              <option value="India">India</option>
              <option value="Australia">Australia</option>
              <option value="London">London</option>
              <option value="America">America</option>
              <option value="France">France</option>
              <option value="Brazil">Brazil</option>
              <option value="England">England</option>
              <option value="South Africa">South Africa</option>
              <option value="Rusia">Rusia</option>
            </select>
            <select>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Polish">Polish</option>
            </select>
          </div>
        </div>
        <div className="bottom1">
          <div className="bottomContent">
            <h4>ABOUT FRESHMEALNOW</h4>
            <p>about</p>
            <p>team</p>
            <p>work with us</p>
            <p>Contact Us</p>
          </div>
          <div className="bottomContent">
            <h4>Contact Us</h4>
            <p>Help & Support</p>
          </div>
          <div className="bottomContent">
            <h4>FOR RESTAURANTS</h4>
            <p>Patner with Us</p>
          </div>
          <div className="bottomContent">
            <h4>LEARN MORE</h4>
            <p>Privacy</p>
            <p>Security</p>
            <p>Terms</p>
          </div>
          <div className="bottomContent">
            <h4>SOCIAL LINKS</h4>
            <div className="links">
              <TwitterIcon />
              <InstagramIcon />
              <YouTubeIcon />
              <FacebookIcon />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="bottom">
        <p>
        &copyright 2023 FreshMealNow. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
