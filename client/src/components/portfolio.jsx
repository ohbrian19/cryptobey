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
      text: "portfolio",
      fontSize: 25,
      fontFamily: "'Major Mono Display', monospace"
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
        dataPoints: data(portfolio),
        indexLabelFontFamily: "'Major Mono Display', monospace"
      }
    ]
  };

  return (
    <div className="portfolio">
      <div className="portfolio-chart">
        {portfolio.length > 0 ? (
          <CanvasJSChart options={options} />
        ) : (
          <span className="portfolio-none">please add coins to portfolio</span>
        )}
      </div>
      {portfolio.length > 0 ? (
        <div className="portfolio-summary">
          <div>
            current value:{" "}
            <CountUp
              start={0}
              end={roundTo(sumCV(portfolio), 2)}
              duration={4}
              separator=","
              prefix="$"
            />
          </div>
          <div>
            purchase value:{" "}
            <CountUp
              start={0}
              end={roundTo(sumPV(portfolio), 2)}
              duration={4}
              separator=","
              prefix="$"
            />
          </div>
          <div>
            gains / losses:{" "}
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
              {"  "}
              {roundTo(
                ((sumCV(portfolio) - sumPV(portfolio)) / sumPV(portfolio)) *
                  100,
                2
              )}
              %
            </span>
          </div>
        </div>
      ) : null}
      <table className="portfolio-table">
        <thead>
          <tr>
            <th className="portfolio-col1" />
            <th className="portfolio-col2">symbol</th>
            <th className="portfolio-col3">name</th>
            <th className="portfolio-col4">amount</th>
            <th className="portfolio-col5">current price</th>
            <th className="portfolio-col6">purchase price</th>
            <th className="portfolio-col7">current value</th>
            <th className="portfolio-col8">purchase value</th>
            <th className="portfolio-col9">gains / losses</th>
            <th className="portfolio-col10">remove</th>
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
                <td className="portfolio-col3">{coin.name.toLowerCase()}</td>
                <td className="portfolio-col4">
                  {numberWithCommas(coin.amount)} {coin.symbol.toLowerCase()}
                </td>
                <td className="portfolio-col5">
                  $ {roundTo(coin.currentPrice, 2)}
                </td>
                <td className="portfolio-col6">$ {coin.purchasePrice}</td>
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
                  <button onClick={() => onClickRemove(coin)}>remove</button>
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
