import React from "react";
import axios from "axios";
// import CoinList from "./coinList.jsx"

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinToggle: false,
      exchange: null,
      exchangeCoins: []
    };

    this.onClickPortfolio = this.onClickPortfolio.bind(this);
    this.onChangeExchange = this.onChangeExchange.bind(this);
  }

  onClickPortfolio() {
    this.setState({
      coinToggle: !this.state.coinToggle
    });
  }

  onChangeExchange() {
    let value = document.getElementById("exchange").value;
    this.setState(
      {
        exchange: value
      },
      () => {
        this.getListCoins(value);
      }
    );
  }

  getListCoins(exchange) {
    return axios.get(`/price/${exchange}`).then(data => {
      console.log(data.data);
      this.setState({
        exchangeCoins: data.data
      });
    });
  }

  render() {
    return (
      <div className="list">
        <div onClick={this.onClickPortfolio}>Portfolio</div>
        {this.state.coinToggle ? (
          <div>
            Add Coins to Portforlio
            <select id="exchange" onChange={this.onChangeExchange}>
              <option value="default">Choose Exchange</option>
              <option value="binance">Binance</option>
              <option value="bitfinex">Bitfinex</option>
              <option value="bitflyer">bitFlyer</option>
              <option value="bithumb">Bithumb</option>
              {/* <option value="bitmax">BitMax</option>   diff from bitmex */}
              <option value="bitstamp">Bitstamp</option>
              <option value="kraken">Kraken</option>
              <option value="poloniex">Poloniex</option>
              <option value="upbit">Upbit</option>
            </select>
            {this.state.exchangeCoins.length > 0 ? (
              <div>
                {this.state.exchangeCoins.map((coin, i) => {
                  return (
                    <span className="list-coin" key={i}>
                      <img src={`/img/${coin.base}.png`} width="20" height="20"/>{coin.base}{" "}
                    </span>
                  );
                })}
              </div>
            ) : null}
          </div>
        ) : null}
        <div>Market Cap</div>
      </div>
    );
  }
}

export default List;
