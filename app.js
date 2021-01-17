const express = require("express");
const rateConverterRoute = require("./route/rate-converter");
const app = express();

app.use(rateConverterRoute);
app.use((req, res, next) => {
  console.log(req.url, "next request");
  next();
});

const listen = app.listen(process.env.PORT || 5000, () => {
  console.log("API is running");
  console.log("on port:", listen.address().port);
});
