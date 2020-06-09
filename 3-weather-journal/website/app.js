/* Global Variables */
const API_KEY = "3e87ae80888f9aa802e12d1da05c8067";

const BASE_API_URL = "http://localhost:5000";

const BASE_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const sendDataToServer = async (temperature) => {
  const userReponse = document.querySelector("textarea#feelings").value;
  console.log("haha", userReponse);
  const results = await fetch(`${BASE_API_URL}/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ temperature, date, userReponse }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return response;
    });
  return results;
};

const handleGenerate = async () => {
  const zipCode = document.querySelector("input#zip").value;
  console.log("Here", zipCode);
  const results = await fetch(
    `${BASE_WEATHER_API_URL}?zip=${zipCode}&appid=${API_KEY}`
  )
    .then((response) => {
      console.log("here");
      return response.json();
    })
    .then(async (response) => {
      console.log(response);
      return await sendDataToServer(response.main.temp);
    })
    .then(async (response) => {
      const data = await fetch(`${BASE_API_URL}/all`)
        .then((r) => r.json())
        .then((data) => data);
      const { projectData } = data;
      console.log(projectData);

      const dateOutput = document.querySelector("div#date");
      const tempOutput = document.querySelector("div#temp");
      const contentOutput = document.querySelector("div#content");

      const recentIndex = Object.keys(data.projectData)
        .map((v) => parseInt(v, 10))
        .reduce((a, b) => Math.max(a, b));

      console.log("done", projectData[recentIndex]);
      const recentDate = projectData[recentIndex].date;
      const recentTemp = projectData[recentIndex].temperature;
      const recentResponse = projectData[recentIndex].userReponse;

      dateOutput.innerHTML = recentDate;
      tempOutput.innerHTML = recentTemp;
      contentOutput.innerHTML = recentResponse;
    });
};

const generate = document.querySelector("#generate");

generate.addEventListener("click", handleGenerate);
