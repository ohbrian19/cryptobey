const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const { COINMARKETCAP_API } = require("../api.config.js");

const app = express();
app.use(express.static(path.join(__dirname, "/../client/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    .get(
      `https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest`,
      { headers: { "X-CMC_PRO_API_KEY": COINMARKETCAP_API } }
    )
    .then(data => {
      res.send(data.data.data);
    })
    .catch(err => {
      console.log(err);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
