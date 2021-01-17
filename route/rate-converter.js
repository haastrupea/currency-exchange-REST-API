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
          "https://currecncy-exchange.herokuapp.com/api/rates?base=CZJ&currency=EUR,GBP,USD",
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

route.get('*',(req,res)=>{
    const paramError = {
        status: 400,
        data: {
            message:"ops!!!. Find sample of how to call this Api in data.callSample property of this Object",
          callSample:
            "https://currecncy-exchange.herokuapp.com/api/rates?base=CZK&currency=EUR,GBP,USD",
        },
      }
    return serverResp(paramError,res)
})

module.exports = route;
