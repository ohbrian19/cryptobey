const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const { API_KEY } = require("./../nomic.config.js");

const app = express();

app.use(express.static(path.join(__dirname, "/../client/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/price/:exchange/:currency", function(req, res) {
  return axios
  .get(`https://api.nomics.com/v1/exchange-markets/prices?key=${API_KEY}&currency=${req.params.currency}&exchange=${req.params.exchange}`)
  .then(data => {
    res.send(data.data);
  })
  .catch(err => {
    console.log(err);
  })
})

app.listen(3000, function() {
  console.log("listening on port 3000!");
});