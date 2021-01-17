const express = require("express");
const { exchange } = require("../src/exhange-api");

const route = express.Router();

const serverResp = (resData, res) => {
  return res.status(resData.status).json({
    results: resData.data,
  });
};
route.get("/api/rates", (req, res) => {
  //get all params
  const base = req.query.base;
  const currency = req.query.currency;
  if (!base || !currency) {
    const paramError = {
      status: 400,
      data: {
        callSample:
          "http://localhost:5000/api/rates?base=CZJ&currency=EUR,GBP,USD",
      },
    };
    paramError.data.error = "Missing parameters: `base` or `currency`";

    return serverResp(paramError, res);
  }

  const parsedCurrency = currency.includes(",")
    ? currency.split(",")
    : [currency];

  exchange(base, parsedCurrency)
    .then((response) => {
      return serverResp(response, res);
    })
    .catch((err) => {
      return serverResp(err, res);
    });
});

module.exports = route;
