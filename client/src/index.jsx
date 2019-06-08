import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// import List from "./components/list.jsx";
// import SelectBox from "./components/selectBox.jsx";
// import Compare from "./components/compare.jsx";
// import Coins from "./components/coins.jsx"
import Table from "./components/table.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinToggle: false,
      exchange: null,
      currency: null,
      exchangeCoins: [],
      baseExchange: [],
      targetExchange: [],
      targetExchangeName: null,
      portfolio: []
    };

    this.onClickPortfolio = this.onClickPortfolio.bind(this);
    this.onChangeExchange = this.onChangeExchange.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
    this.onChangeTargetExchange = this.onChangeTargetExchange.bind(this);
    this.onClickCoin = this.onClickCoin.bind(this);
  }

  componentDidMount() {}

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
        if (this.state.exchange && this.state.currency) {
          this.getListCoins();
        }
      }
    );
  }

  onChangeCurrency() {
    let value = document.getElementById("currency").value;
    this.setState(
      {
        currency: value
      },
      () => {
        if (this.state.exchange && this.state.currency) {
          this.getListCoins();
        }
      }
    );
  }

  onChangeTargetExchange() {
    let value = document.getElementById("targetExchange").value;
    return axios.get(`/price/${value}/${this.state.currency}`).then(data => {
      this.setState({
        targetExchangeName: value,
        targetExchange: data.data
      });
    });
  }

  onClickCoin(e) {
    let coin = {
      exchange: e.exchange, // binance
      base: e.base, // ADA
      quote: e.quote, // BTC
      price: e.price_quote // Price
    }
    // If I refresh, portfolio goes to initial state, so maybe later store in database
    // if there is same exchange, base, quote alert "already added"
    this.setState({
      portfolio: [...this.state.portfolio, coin]
    }, () => {
      alert("Added to Portfolio");
    })
  }

  getListCoins() {  
    return axios
      .get(`/price/${this.state.exchange}/${this.state.currency}`)
      .then(data => {
        this.setState({
          exchangeCoins: data.data,
          baseExchange: data.data
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="container-left">
          <div className="container-left-header">cryptObey</div>
          <div className="coin-portfolio">
            <div onClick={this.onClickPortfolio}>Compare Exchange</div>
            {this.state.coinToggle ? (
              <div>
                <select id="exchange" onChange={this.onChangeExchange}>
                  <option value="null">Choose Exchange</option>
                  <option value="binance">Binance</option>
                  <option value="bitfinex">Bitfinex</option>
                  <option value="bitflyer">bitFlyer</option>
                  <option value="bithumb">Bithumb</option>
                  {/* <option value="bitmax">BitMax</option>   diff from bitmex */}
                  <option value="bitstamp">Bitstamp</option>
                  <option value="bittrex">Bittrex</option>
                  <option value="kraken">Kraken</option>
                  <option value="poloniex">Poloniex</option>
                  <option value="upbit">Upbit</option>
                </select>
                <select id="currency" onChange={this.onChangeCurrency}>
                  <option value="null">Choose Currency</option>
                  <option value="BTC">BTC</option>
                  <option value="USD">USD</option>
                  <option value="USDT">USDT</option>
                  <option value="KRW">KRW</option>
                </select>
                <select
                  id="targetExchange"
                  onChange={this.onChangeTargetExchange}
                >
                  <option value="null">Choose Exchange</option>
                  <option value="binance">Binance</option>
                  <option value="bitfinex">Bitfinex</option>
                  <option value="bitflyer">bitFlyer</option>
                  <option value="bithumb">Bithumb</option>
                  {/* <option value="bitmax">BitMax</option>   diff from bitmex */}
                  <option value="bitstamp">Bitstamp</option>
                  <option value="bittrex">Bittrex</option>
                  <option value="kraken">Kraken</option>
                  <option value="poloniex">Poloniex</option>
                  <option value="upbit">Upbit</option>
                </select>
                {this.state.exchangeCoins.length > 0 ? (
                  <div className="coin-portfolio-coins">
                    {this.state.exchangeCoins.map((coin, i) => {
                      if (coin.quote === this.state.currency) {
                        return (
                          <span className="coin-portfolio-coin" key={i}>
                            <img
                              src={`/img/${coin.base}.png`}
                              width="20"
                              height="20"
                            />
                            {coin.base}{" "}
                          </span>
                        );
                      }
                    })}
                  </div>
                ) : null}
              </div>
            ) : null}
            <div>Market Cap</div>
            <div>Portfolio</div>
          </div>
        </div>
        <div className="container-right">
          <Table
            coins={this.state.baseExchange}
            currency={this.state.currency}
            targetExchange={this.state.targetExchange}
            targetExchangeName={this.state.targetExchangeName}
            onClickCoin={this.onClickCoin}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
