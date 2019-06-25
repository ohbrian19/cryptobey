const { Portfolio } = require("./mongo.js");

const getDataFromDatabase = () => {
  return Portfolio.find().catch(err => {
    console.log(err);
  });
};

const addDataToDatabase = data => {
  return Portfolio.findOneAndUpdate(
    { symbol: data.symbol },
    {
      symbol: data.symbol,
      name: data.name,
      amount: data.amount,
      purchasePrice: data.purchasePrice,
      currentPrice: data.currentPrice
    },
    { upsert: true }
  ).catch(err => console.log(err));
};

const updateCurrentPrice = data => {
  return Portfolio.findOneAndUpdate(
    { symbol: data.symbol },
    {
      currentPrice: data.quote.USD.price
    }
  ).catch(err => console.log(err));
};

const deleteDataFromDatabase = data => {
  return Portfolio.findOneAndDelete({ symbol: data }).catch(err =>
    console.log(err)
  );
};

module.exports = {
  getDataFromDatabase,
  addDataToDatabase,
  deleteDataFromDatabase,
  updateCurrentPrice
};
