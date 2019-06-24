const roundTo = require("round-to");

const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const explodePie = e => {
  for (var i = 0; i < e.dataSeries.dataPoints.length; i++) {
    if (i !== e.dataPointIndex) e.dataSeries.dataPoints[i].exploded = false;
  }
};

const sumCV = coins => {
  if (coins.length === 1) {
    return coins[0].currentPrice * Number(coins[0].amount);
  } else {
    return coins.reduce((a, b) => a + Number(b.amount) * b.currentPrice, 0);
  }
};

const sumPV = coins => {
  if (coins.length === 1) {
    return coins[0].purchasePrice * Number(coins[0].amount);
  } else {
    return coins.reduce((a, b) => a + Number(b.amount) * b.purchasePrice, 0);
  }
};

const data = coins =>
  coins.map(coin => {
    return {
      y: roundTo(
        ((coin.currentPrice * Number(coin.amount)) / sumCV(coins)) * 100,
        2
      ),
      label: coin.name
    };
  });

module.exports = {
  numberWithCommas,
  data,
  explodePie,
  sumCV,
  sumPV
};
