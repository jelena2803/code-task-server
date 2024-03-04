const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 8080;

app.use(cors());

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
