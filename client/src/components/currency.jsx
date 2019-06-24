import React from "react";
import { currencyList, theme } from "./../helper.js";
import { Select, Grommet, TextInput } from "grommet";
import axios from "axios";
import roundTo from "round-to";
import getSymbolFromCurrency from "currency-symbol-map";

class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: "base",
      amount: null,
      rate: "rate",
      value: null,
      options: currencyList,
      targetOptions: currencyList
    };
  }

  onChangeBase(e) {
    if (this.state.rate !== "rate" && this.state.amount) {
      this.setState(
        {
          base: e.value
        },
        () => {
          return axios.get(`/currency/${this.state.base}`).then(data => {
            this.setState({
              value: roundTo(this.state.amount * data.data[this.state.rate], 2)
            });
          });
        }
      );
    } else {
      this.setState({
        base: e.value
      });
    }
  }

  onChangeRate(e) {
    let upperCase = e.value.toUpperCase();
    if (this.state.base !== "base" && this.state.amount) {
      this.setState(
        {
          rate: upperCase
        },
        () => {
          return axios.get(`/currency/${this.state.base}`).then(data => {
            this.setState({
              value: roundTo(this.state.amount * data.data[upperCase], 2)
            });
          });
        }
      );
    } else {
      this.setState({
        rate: e.value
      });
    }
  }

  onChangeAmount(e) {
    let amount = e.target.value;
    if (this.state.base !== "base" && this.state.rate !== "rate") {
      this.setState(
        {
          amount: amount
        },
        () => {
          return axios.get(`/currency/${this.state.base}`).then(data => {
            this.setState({
              value: roundTo(this.state.amount * data.data[this.state.rate], 2)
            });
          });
        }
      );
    } else {
      this.setState({
        amount: amount
      });
    }
  }

  render() {
    return (
      <div className="currency">
        <div className={this.state.base === "base" ? "currency-animate" : null}>
          <Grommet theme={theme}>
            <Select
              value={this.state.base}
              onChange={e => this.onChangeBase(e)}
              options={this.state.options}
              plain={true}
              icon={false}
              dropProps={{color: "black"}}
              onSearch={searchText => {
                const regexp = new RegExp(searchText, "i");
                this.setState({
                  options: currencyList.filter(o => o.match(regexp))
                });
              }}
            />
          </Grommet>
        </div>
        <div className={this.state.amount === 1 ? "currency-animate" : null}>
          <TextInput
            placeholder="amount"
            plain={true}
            onChange={e => this.onChangeAmount(e)}
          />
        </div>
        <div className={this.state.rate === "rate" ? "currency-animate" : null}>
          <Grommet theme={theme}>
            <Select
              value={this.state.rate.toLowerCase()}
              onChange={e => this.onChangeRate(e)}
              options={this.state.targetOptions}
              plain={true}
              icon={false}
              onSearch={searchText => {
                const regexp = new RegExp(searchText, "i");
                this.setState({
                  targetOptions: currencyList.filter(o => o.match(regexp))
                });
              }}
            />
          </Grommet>
        </div>
        <div className="currency-convert">
          {this.state.value
            ? getSymbolFromCurrency(this.state.rate).toLowerCase() +
              " " +
              this.state.value
            : "total"}
        </div>
      </div>
    );
  }
}
export default Currency;
