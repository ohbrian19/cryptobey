import React from "react";
import { numberWithCommas } from "./../helper.js";
import roundTo from "round-to";
import CountUp from "react-countup";

const Market = ({
  market,
  total,
  onClickPrice,
  onClickMarketCap,
  onClickChange,
  onClickSupply,
  onClickCoinToAdd
}) => {
  return (
    <div className="market">
      <div className="market-total">
        Total Market Cap
        <div className="market-total-value">
          <CountUp
            start={0}
            end={total || 1234567890}
            duration={5}
            separator=" "
            prefix="$ "
          />
        </div>
      </div>
      <table className="market-table">
        <thead>
          <tr>
            <th className="col1">Rank</th>
            <th className="col2">Name</th>
            <th className="col3 headerClick" onClick={onClickMarketCap}>
              Market Cap
            </th>
            <th className="col4 headerClick" onClick={onClickPrice}>
              Price
            </th>
            <th className="col5 headerClick" onClick={onClickSupply}>
              Circulating Supply
            </th>
            <th className="col6 headerClick" onClick={onClickChange}>
              Change(24h)%
            </th>
          </tr>
        </thead>
        <tbody>
          {market.map((coin, i) => {
            return (
              <tr key={i} onClick={() => onClickCoinToAdd(coin)}>
                <td className="col1">{coin.cmc_rank}</td>
                <td className="col2">
                  <img
                    src={`/img/${coin.symbol.toLowerCase()}.png`}
                    width="18"
                    height="18"
                    align="middle"
                  />{" "}
                  <span className="col2-name">{coin.name}</span>
                </td>
                <td className="col3">
                  $
                  {numberWithCommas(
                    Math.round(Number(coin.quote.USD.market_cap))
                  )}
                </td>
                <td className="col4">
                  ${roundTo(Number(coin.quote.USD.price), 6)}
                </td>
                <td className="col5">
                  {numberWithCommas(
                    Math.round(Number(coin.circulating_supply))
                  )}{" "}
                  {coin.symbol}
                </td>
                <td className="col6">
                  <span
                    style={
                      Number(coin.quote.USD.percent_change_24h) > 0
                        ? { color: "blue" }
                        : Number(coin.quote.USD.percent_change_24h) < 0
                        ? { color: "red" }
                        : null
                    }
                  >
                    {roundTo(Number(coin.quote.USD.percent_change_24h), 2)} %
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Market;
