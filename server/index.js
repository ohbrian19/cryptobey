const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const COINMARKETCAP_API =
  process.env.API || require("../api.config.js").COINMARKETCAP_API;
const cors = require("cors");
const {
  getDataFromDatabase,
  addDataToDatabase,
  deleteDataFromDatabase,
  updateCurrentPrice
} = require("./db/helper.js");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "/../client/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/portfolio", function(req, res) {
  return getDataFromDatabase()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    });
});

app.post("/portfolio", function(req, res) {
  return addDataToDatabase(req.body)
    .then(() => {
      res.send();
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    });
});

app.post("/update", function(req, res) {
  return updateCurrentPrice(req.body)
    .then(() => {
      res.send();
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    });
});

app.get("/portfolio/:coin", function(req, res) {
  return deleteDataFromDatabase(req.params.coin)
    .then(() => {
      res.send();
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    });
});

app.get("/market", function(req, res) {
  return axios
    .get(
      `https://pro-\api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
      { headers: { "X-CMC_PRO_API_KEY": COINMARKETCAP_API } }
    )
    .then(data => {
      res.send(data.data.data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/total", function(req, res) {
  return axios
    .get(`https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest`, {
      headers: { "X-CMC_PRO_API_KEY": COINMARKETCAP_API }
    })
    .then(data => {
      res.send(data.data.data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/currency/:base", function(req, res) {
  return axios
    .get(
      `https://api.ratesapi.io/api/latest?base=${req.params.base.toUpperCase()}`
    )
    .then(data => {
      res.send(data.data.rates);
    })
    .catch(err => {
      console.log(err);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
