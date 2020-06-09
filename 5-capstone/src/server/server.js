// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

console.log("About to start server");

// Express to run server and routes
const express = require("express");

// Start up server instance
const server = express();

// Set up body-parser
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Set up cors
const cors = require("cors");
server.use(cors());

// require for jest to work
const regeneratorRuntime = require("regenerator-runtime");

// Init main project folder
server.use(express.static("dist"));

// Set up default index.html
server.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// Spin up the server
let port = 8082;
server.listen(port, function () {
  console.log(`Running on port: ${port}`);
});

// Set up node-fetch
const fetch = require("node-fetch");

// Return lat and long from city name
async function cityCoords(city) {
  const url = encodeURI(
    `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${process.env.GEONAMES_API_USR}`
  );

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const myResData = {
        lat: json.geonames[0].lat,
        long: json.geonames[0].lng,
        country: json.geonames[0].countryCode,
      };
      return myResData;
    } catch (error) {
      console.log(error);
    }
  };
  return getData(url);
}

async function getWeather(coords, tripDate) {
  const latLon = `${coords.lat},${coords.long}`;

  let countDownDate = new Date(tripDate).getTime();

  let now = new Date().getTime();

  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));

  let url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${latLon}`;

  if (days > 7) {
    url += `,${countDownDate / 1000}`;
  }

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const myResData = {
        temp: json.currently.temperature,
        summary: json.hourly.summary,
      };
      return myResData;
      // return json
    } catch (error) {
      console.log(error);
    }
  };
  return getData(url);
}

// POST route for weather
server.post("/weather", async function (req, res) {
  const ret1 = await cityCoords(req.body.city);
  const ret2 = await getWeather(ret1, req.body.date);
  res.send(ret2);
});

// return pixabay image link
async function getImageLink(search) {
  var url = encodeURI(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${search}&category=places`
  );

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const myResData = {
        url: json.hits[0].webformatURL,
      };
      return myResData;
    } catch (error) {
      console.log(error);
    }
  };
  return getData(url);
}

server.post("/image", async function (req, res) {
  const imageLink = await getImageLink(req.body.city);
  res.send(imageLink);
});

module.exports = server;
