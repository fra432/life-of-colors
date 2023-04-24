import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="footer-container">
      {/*  <div className="footer-banner-container">
        <div className="footer-banner-overlay"></div>
        <img className="footer-banner-image" src="assets/banner.png" alt="" />
      </div> */}
      <p>Copyright 2023 - All Rights Reserved</p>
      <p className="icons">
        <AiFillInstagram />
        <AiFillLinkedin />
      </p>
    </div>
  );
};

export default Footer;
