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
      <div>name: {coin.name.toLowerCase()}</div>
      <div>symbol: {coin.symbol.toLowerCase()}</div>
      <div>current price: ${coin.price}</div>
      <div>
        <form id="modal-input-price">
          purchase price: $
          <input type="number" min="0" onChange={onChangePurchasePrice} />
        </form>
      </div>
      <div>
        <form id="modal-input-amount">
          amount: <input type="number" min="0" onChange={onChangeAmount} />{" "}
          {coin.symbol.toLowerCase()}
        </form>
      </div>
      <div>
        <form onClick={e => onSubmitAddPortfolio(e)}>
          <button className="popup-button">add to portforlio</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
