"use strict";

let longitude = "11.974560";
let latitude = "57.708870";

const container = document.querySelector(".container");
const date = document.querySelector(".date");

//const today = new Date();
const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
date.innerHTML = `${day}/${month}-${year}`;

const cities = document.querySelectorAll("button");
cities.forEach(city => {
  city.addEventListener("click", () => {
    let longitude = city.dataset.longitudeValue;
    let latitude = city.dataset.latitudeValue;

    let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;
    getWeather(url);
  });
});

// Check for rain
const doesItRain = x => {
  if (x === 3) {
    return true;
  } else {
    return false;
  }
};

function getWeather(url) {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(json => {
      // should be set to [0] to get the current date/time
      const currentTime = json.timeSeries[0];
      const temp = currentTime.parameters[11].values[0];
      const rain = currentTime.parameters[1].values[0];

      for (let i = 0; i < currentTime.parameters.length; i++) {
        if (currentTime.parameters[i].name === "t") {
          console.log(currentTime.parameters[i].values[0]);
        }

        if (currentTime.parameters[i].name === "pcat") {
          console.log(currentTime.parameters[i].values[0]);
        }
      }

      if (doesItRain(rain)) {
        console.log("RAIN :(");
        const icon = "🌧";
        container.innerHTML = icon;
      } else {
        console.log("NO RAIN :)");
        const icon = "☀️";
        container.innerHTML = icon;
      }

      const temperature = document.createElement("P");
      temperature.innerHTML = `${temp} °C`;
      container.appendChild(temperature);

      console.log(`${temp} °C`);
    });
}

// https://opendata.smhi.se/apidocs/metfcst/parameters.html
// https://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-pcat
