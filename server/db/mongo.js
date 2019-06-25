const mongoose = require('mongoose');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '27017';

mongoose.connect(`mongodb://${host}:${port}/cryptobey`, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log(`Connected to mongoDB on host: ${host} port: ${port} database: cryptobey`);
});

const portfolio = mongoose.Schema(
  {
    symbol: { type: String, unique: true },
    name: String,
    amount: Number,
    purchasePrice: Number,
    currentPrice: Number
  }
);

const Portfolio = mongoose.model('Portfolio', portfolio, 'portfolio');

module.exports.db = db;
module.exports.Portfolio = Portfolio;
