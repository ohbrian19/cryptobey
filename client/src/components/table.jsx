import React from "react";

class Table extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return this.props.coins.length > 0 ? (
      <div className="coinsTable">
        <table className="darkTable">
          <thead>
            <tr>
              <th>Coin</th>
              <th>
                {this.props.coins[0].exchange}({this.props.coins[0].quote})
              </th>
              <th>{this.props.targetExchangeName}</th>
              <th>Price Diff</th>
              <th>% Diff</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {this.props.coins.map((coin, i) => {
              if (coin.quote === this.props.currency) {
                return (
                  <tr key={i} value={coin}>
                    <td>
                      <img
                        src={`/img/${coin.base}.png`}
                        width="20"
                        height="20"
                      />
                      {coin.base}
                    </td>
                    <td>
                      {coin.price_quote} {coin.quote}
                    </td>
                    <td>
                      {this.props.targetExchange.map(targetCoin => {
                        if (
                          coin.base === targetCoin.base &&
                          coin.quote === targetCoin.quote
                        ) {
                          return (
                            targetCoin.price_quote + " " + targetCoin.quote
                          );
                        }
                      })}
                    </td>
                    <td>
                      {this.props.targetExchange.map(targetCoin => {
                        if (
                          coin.base === targetCoin.base &&
                          coin.quote === targetCoin.quote
                        ) {
                          return (
                            coin.price_quote -
                            targetCoin.price_quote +
                            " " +
                            targetCoin.quote
                          );
                        }
                      })}
                    </td>
                    <td>
                      {this.props.targetExchange.map(targetCoin => {
                        if (
                          coin.base === targetCoin.base &&
                          coin.quote === targetCoin.quote
                        ) {
                          return (
                            Math.round(
                              ((coin.price_quote / targetCoin.price_quote) *
                                100 -
                                100) *
                                100
                            ) /
                              100 +
                            " " +
                            "%"
                          );
                        }
                      })}
                    </td>
                    <td><button onClick={() => this.props.onClickCoin(coin)}>Add</button></td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    ) : null;
  }
}

export default Table;
