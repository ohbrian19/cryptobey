import React from "react";
//  Binance, Bithumb, Coinbase Pro, Kraken, Bitstamp, Poloniex, bitFlyer, Bitfinex
const SelectBox = ({ onChangeCoin }) => {
  return (
    <div className="select-box">
      <span>
        {" "}
        Select Platform
        <select>
          <option></option>
          <option></option>
          <option></option>
        </select>
      </span>
      <span>
        {" "}
        Select Platform to Compare
        <select>
          <option></option>
          <option></option>
          <option></option>
        </select>
      </span>
      <span>
        {" "}
        Select coins
        <select onChange={onChangeCoin} id="coin">
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="XRP">XRP</option>
        </select>
      </span>
    </div>
  );
};

export default SelectBox;
