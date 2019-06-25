import React from "react";
import ScrollToTop from "react-scroll-up";

const Footer = props => {
  return (
    <div className="footer">
      <ScrollToTop showUnder={160}>
        <img className="up" src="/logo/up.png" width="50" />
      </ScrollToTop>
    </div>
  );
};

export default Footer;
