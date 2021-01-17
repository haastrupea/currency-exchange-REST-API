const axios = require("axios");

const baseUrl = "https://api.exchangeratesapi.io";

const config = {
  baseURL: baseUrl,
  responseType: "json",
};
exports.exchange = async (base = "", currency = []) => {
  const res = await axios
    .get(
      `/latest?base=${base.toUpperCase()}&symbols=${currency
        .join(",")
        .toUpperCase()}`,
      config
    )
    .then((res) => {
      return { status: res.status, data: res.data };
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request cancelled");
        return {
          status: 400,
          data: { message: "Request cancelled by the server" },
        };
      } else {
        if (err.response) {
          const response = err.response;
          const status = response.status;
          const error = response.statusText;
          const data = response.data;
          const res = { status };

          if (data) {
            res.data = data;
          } else {
            res.data = { error };
          }
          return res;
        } else {
          console.log("couldnt talk to exchange API at the moment");
          return {
            status: 500,
            data: { message: "could not verify Exchange APi at the moment" },
          };
        }
      }
    });
  return res;
};
