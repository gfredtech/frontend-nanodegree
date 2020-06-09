const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.get("/all", (req, res) => {
  return res.status(200).send({
    success: "true",
    projectData,
  });
});

app.post("/add", (req, res) => {
  const { temperature, date, userReponse } = req.body;
  console.log(temperature, date, userReponse);
  projectData[Object.keys(projectData).length] = {
    temperature,
    date,
    userReponse,
  };
  console.log(projectData);
  res.status(200).send({
    sucess: true,
    message: "Added new entry successfully",
  });
});

app.listen(5000, () => console.log("listening on port 5000"));
