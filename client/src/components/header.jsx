import React from "react";

const Header = ({ onClickMarketOrPortfolio, marketOrPortfolio, showCurrency }) => {
  return (
    <div className="header">
      <img className="header-logo" src="logo/crypto.png" height="50px" />
      <span className="header-portfolio" onClick={onClickMarketOrPortfolio}>
        {marketOrPortfolio ? "market cap" : "portfolio"}
      </span>
      <span className="header-portfolio" onClick={showCurrency}>currency</span>
    </div>
  );
};

export default Header;
