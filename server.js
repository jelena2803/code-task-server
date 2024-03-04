const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const app = express();
const PORT = 8080;

function middleware(req, res, next) {
  const testApiValue = process.env.TEST_API;
  // Use testApiValue in your middleware logic
  console.log("TEST_API value:", testApiValue);
  next();
}

app.use(cors());
app.use(middleware);

app.get("/houses", async (req, res) => {
  const { name } = req.query;

  try {
    const response = await axios.get(
      "https://wizard-world-api.herokuapp.com/houses"
    );
    let dataFromAPI = response.data;

    filteredDataFromAPI = dataFromAPI.filter(
      (e) => e.name.toLowerCase().includes(name.toLowerCase()) === true
    );

    res.send(filteredDataFromAPI);
  } catch (err) {
    res.json(err);
  }
});

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://wizard-world-api.herokuapp.com/houses"
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT);
