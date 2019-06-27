# cryptObey
<img src='./cryptobey.gif'>

`cryptObey` uses `CoinMarketCap API` and `Rates API` to bring you real-time information of top 100 cryptocurrencies and over 30 different exchange rates

## Prerequisites
- Node
- NPM
- MongoDB

## Deployment

If hosting cryptObey on you own environment, you must provide your own `CoinMarketCap` API key
- `CoinMarketCap` API key as an `process.env.API` or put the API key in `api.config.example.js` and change the file name to `api.config.js`

### Steps to deploy

```
npm install - install all the packages required
npm start - start server on default port 3000
npm run build - webpack compiling
```

## Technology Used

* [ReactJS](https://reactjs.org/)
* [ExpressJS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
