import React from "react";
import roundTo from "round-to";
import CanvasJSReact from "./../canvasjs.react.js";
import {
  explodePie,
  data,
  sumCV,
  sumPV,
  numberWithCommas
} from "./../helper.js";
import CountUp from "react-countup";

const Portfolio = ({ portfolio, onClickRemove }) => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const options = {
    theme: "dark1",
    animationEnabled: true,
    title: {
      text: "Portfolio",
      fontSize: 30
    },
    backgroundColor: "black",
    data: [
      {
        type: "pie",
        indexLabelFontSize: 18,
        radius: 100,
        indexLabel: "{label}",
        yValueFormatString: '###0.0"%"',
        click: explodePie,
        dataPoints: data(portfolio)
      }
    ]
  };

  return (
    <div className="portfolio">
      <div className="portfolio-chart">
        {portfolio.length > 0 ? (
          <CanvasJSChart options={options} />
        ) : (
          <span className="portfolio-none">Please Add Coins To Portfolio</span>
        )}
      </div>
      {portfolio.length > 0 ? (
        <div className="portfolio-summary">
          <div>
            Current Value:{" "}
            <CountUp
              start={0}
              end={roundTo(sumCV(portfolio), 2)}
              duration={4}
              separator=","
              prefix="$"
            />
          </div>
          <div>
            Purchase Value:{" "}
            <CountUp
              start={0}
              end={roundTo(sumPV(portfolio), 2)}
              duration={4}
              separator=","
              prefix="$"
            />
          </div>
          <div>
            Gains / Losses:{" "}
            <span
              style={
                roundTo(sumCV(portfolio) - sumPV(portfolio), 2) > 0
                  ? { color: "green" }
                  : roundTo(sumCV(portfolio) - sumPV(portfolio), 2) < 0
                  ? { color: "red" }
                  : null
              }
            >
              <CountUp
                start={0}
                end={roundTo(sumCV(portfolio) - sumPV(portfolio), 2)}
                duration={4}
                separator=","
                prefix="$"
              />
            </span>
          </div>
        </div>
      ) : null}
      <table className="portfolio-table">
        <thead>
          <tr>
            <th className="portfolio-col1" />
            <th className="portfolio-col2">Symbol</th>
            <th className="portfolio-col3">Name</th>
            <th className="portfolio-col4">Amount</th>
            {/* <th className="portfolio-col5">Current Price</th>
            <th className="portfolio-col6">Purchase Price</th> */}
            <th className="portfolio-col7">Current Value</th>
            <th className="portfolio-col8">Purchase Value</th>
            <th className="portfolio-col9">Gains / Losses</th>
            <th className="portfolio-col10">Remove</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((coin, i) => {
            let cv = coin.amount * coin.currentPrice;
            let pv = coin.amount * coin.purchasePrice;
            return (
              <tr key={i}>
                <td className="portfolio-col1">{i + 1}</td>
                <td className="portfolio-col2">
                  <img
                    src={`/img/${coin.symbol.toLowerCase()}.png`}
                    height="18"
                  />
                </td>
                <td className="portfolio-col3">{coin.name}</td>
                <td className="portfolio-col4">
                  {numberWithCommas(coin.amount)} {coin.symbol}
                </td>
                {/* <td className="portfolio-col5">$ {coin.currentPrice}</td>
                <td className="portfolio-col6">$ {coin.purchasePrice}</td> */}
                <td className="portfolio-col7">
                  $ {numberWithCommas(roundTo(cv, 2))}
                </td>
                <td className="portfolio-col8">
                  $ {numberWithCommas(roundTo(pv, 2))}
                </td>
                <td
                  className="portfolio-col9"
                  style={
                    cv - pv > 0
                      ? { color: "blue" }
                      : cv - pv < 0
                      ? { color: "red" }
                      : null
                  }
                >
                  {roundTo(((cv - pv) / pv) * 100, 2)} %
                </td>
                <td className="portfolio-col10">
                  <button onClick={() => onClickRemove(i)}>remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
