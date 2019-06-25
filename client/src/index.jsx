import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/header.jsx";
import Market from "./components/market.jsx";
import Portfolio from "./components/portfolio.jsx";
import Footer from "./components/footer.jsx";
import Popup from "./components/popup.jsx";
import Currency from "./components/currency.jsx";
import Modal from "react-animated-modal";
import roundTo from "round-to";
import Rodal from "rodal";
import "./../../node_modules/rodal/lib/rodal.css";
import { style } from "./helper.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      market: [],
      total: null,
      portfolio: [],
      sortPrice: false,
      sortMarketCap: false,
      sortChange: false,
      sortSupply: false,
      showModal: false,
      marketOrPortfolio: false,
      coinOnModal: null,
      purchasePrice: 0,
      amount: 0,
      showCurrency: false
    };

    this.onClickPrice = this.onClickPrice.bind(this);
    this.onClickMarketCap = this.onClickMarketCap.bind(this);
    this.onClickChange = this.onClickChange.bind(this);
    this.onClickSupply = this.onClickSupply.bind(this);
    this.onClickCoinToAdd = this.onClickCoinToAdd.bind(this);
    this.onClickMarketOrPortfolio = this.onClickMarketOrPortfolio.bind(this);
    this.onChangePurchasePrice = this.onChangePurchasePrice.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmitAddPortfolio = this.onSubmitAddPortfolio.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
    this.showCurrency = this.showCurrency.bind(this);
  }

  componentDidMount() {
    this.getTotalMarketCap();
    this.getMarketCap();
  }

  getTotalMarketCap() {
    return axios.get("/total").then(data => {
      this.setState({
        total: Math.round(data.data.quote.USD.total_market_cap)
      });
    });
  }

  getMarketCap() {
    return axios.get("/market").then(data => {
      this.setState({
        market: data.data
      });
    });
  }

  onClickPrice() {
    this.setState({
      market: !this.state.sortPrice
        ? this.state.market.sort(
            (a, b) => a.quote.USD.price - b.quote.USD.price
          )
        : this.state.market.sort(
            (a, b) => b.quote.USD.price - a.quote.USD.price
          ),
      sortPrice: !this.state.sortPrice
    });
  }

  onClickMarketCap() {
    this.setState({
      market: !this.state.sortMarketCap
        ? this.state.market.sort(
            (a, b) => a.quote.USD.market_cap - b.quote.USD.market_cap
          )
        : this.state.market.sort(
            (a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap
          ),
      sortMarketCap: !this.state.sortMarketCap
    });
  }

  onClickChange() {
    this.setState({
      market: !this.state.sortChange
        ? this.state.market.sort(
            (a, b) =>
              a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h
          )
        : this.state.market.sort(
            (a, b) =>
              b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h
          ),
      sortChange: !this.state.sortChange
    });
  }

  onClickSupply() {
    this.setState({
      market: !this.state.sortSupply
        ? this.state.market.sort(
            (a, b) => a.circulating_supply - b.circulating_supply
          )
        : this.state.market.sort(
            (a, b) => b.circulating_supply - a.circulating_supply
          ),
      sortSupply: !this.state.sortSupply
    });
  }

  onClickCoinToAdd(coin) {
    this.setState({
      showModal: !this.state.showModal,
      coinOnModal: !this.state.showModal
        ? {
            name: coin.name,
            symbol: coin.symbol,
            price:
              coin.quote.USD.price > 1
                ? roundTo(coin.quote.USD.price, 2)
                : roundTo(coin.quote.USD.price, 6)
          }
        : null,
      amount: 0,
      purchasePrice: 0
    });
  }

  onClickMarketOrPortfolio() {
    this.setState({
      marketOrPortfolio: !this.state.marketOrPortfolio
    });
  }

  onChangePurchasePrice(e) {
    this.setState({
      purchasePrice: e.target.value
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onSubmitAddPortfolio(e) {
    e.preventDefault();
    for (let i = 0; i < this.state.portfolio.length; i++) {
      if (this.state.portfolio[i].name === this.state.coinOnModal.name) {
        console.log("Coin already exists in portfolio");
        return;
      }
    }
    if (this.state.purchasePrice > 0 && this.state.amount > 0) {
      console.log("Successfully Added!");
      let coin = {
        name: this.state.coinOnModal.name,
        symbol: this.state.coinOnModal.symbol,
        currentPrice: this.state.coinOnModal.price,
        purchasePrice: this.state.purchasePrice,
        amount: this.state.amount
      };
      this.setState({
        portfolio: [...this.state.portfolio, coin],
        showModal: false,
        purchasePrice: 0,
        amount: 0
      });
    } else {
      console.log("Please type in both purchase price and amount of the coin");
      document.getElementById("modal-input-price").reset();
      document.getElementById("modal-input-amount").reset();
      this.setState({
        purchasePrice: 0,
        amount: 0
      });
    }
  }

  onClickRemove(i) {
    const portfolioAdjusted = this.state.portfolio;
    portfolioAdjusted.splice(i, 1);
    this.setState({
      portfolio: portfolioAdjusted
    });
  }

  showCurrency() {
    this.setState({ showCurrency: !this.state.showCurrency });
  }

  render() {
    return (
      <div>
        <Header
          marketOrPortfolio={this.state.marketOrPortfolio}
          onClickMarketOrPortfolio={this.onClickMarketOrPortfolio}
          showCurrency={this.showCurrency}
          loginLogout={this.loginLogout}
        />
        <Modal
          visible={this.state.showModal}
          closemodal={this.onClickCoinToAdd}
          type="bounceIn"
        >
          <Popup
            coin={this.state.coinOnModal}
            onChangePurchasePrice={this.onChangePurchasePrice}
            onChangeAmount={this.onChangeAmount}
            onSubmitAddPortfolio={this.onSubmitAddPortfolio}
          />
        </Modal>
        <Rodal
          visible={this.state.showCurrency}
          onClose={this.showCurrency}
          customStyles={style}
          animation="slideRight"
          width={250}
          duration={500}
          showCloseButton={false}
        >
          <Currency />
        </Rodal>
        {!this.state.marketOrPortfolio ? (
          <Market
            onClickPrice={this.onClickPrice}
            onClickMarketCap={this.onClickMarketCap}
            onClickChange={this.onClickChange}
            onClickSupply={this.onClickSupply}
            onClickCoinToAdd={this.onClickCoinToAdd}
            market={this.state.market}
            total={this.state.total}
          />
        ) : (
          <Portfolio
            portfolio={this.state.portfolio}
            onClickRemove={this.onClickRemove}
          />
        )}

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
