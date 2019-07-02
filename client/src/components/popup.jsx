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
      <div><b>name: </b>{coin.name.toLowerCase()}</div>
      <div><b>symbol: </b>{coin.symbol.toLowerCase()}</div>
      <div><b>current price: </b>${coin.price}</div>
      <div>
        <form id="modal-input-price">
        <b>purchase price: </b>$
          <input type="number" min="0" onChange={onChangePurchasePrice} />
        </form>
      </div>
      <div>
        <form id="modal-input-amount">
        <b>amount: </b><input type="number" min="0" onChange={onChangeAmount} />{" "}
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
