import React from "react";

const Popup = ({
  coin,
  onChangePurchasePrice,
  onChangeAmount,
  onSubmitAddPortfolio
}) => {
  return (
    <div className="popup">
      <div>
        <img src={`/img/${coin.symbol.toLowerCase()}.png`} width="30" />
      </div>
      <div>Name: {coin.name}</div>
      <div>Symbol: {coin.symbol}</div>
      <div>Current Price: ${coin.price}</div>
      <div>
        <form id="modal-input-price">
          Purchase Price: $
          <input type="number" min="0" onChange={onChangePurchasePrice} />
        </form>
      </div>
      <div>
        <form id="modal-input-amount">
          Amount: <input type="number" min="0" onChange={onChangeAmount} />{" "}
          {coin.symbol}
        </form>
      </div>
      <div>
        <form onClick={e => onSubmitAddPortfolio(e)}>
          <button className="popup-button">Add to Portforlio</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
