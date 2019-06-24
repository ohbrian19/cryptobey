import React from "react";

const Header = ({ onClickMarketOrPortfolio, marketOrPortfolio }) => {
  return (
    <div className="header">
      <img className="header-logo" src="logo/crypto.png" height="50px" />
      <span className="header-portfolio" onClick={onClickMarketOrPortfolio}>
        {marketOrPortfolio ? "Market Cap" : "PortFolio"}
      </span>
      <span className="header-portfolio">Currency</span>
    </div>
  );
};

export default Header;
