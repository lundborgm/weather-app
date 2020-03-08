"use strict";

let longitude = "11.974560";
let latitude = "57.708870";

const container = document.querySelector(".container");
const date = document.querySelector(".date");
const time = document.querySelector(".time");

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
date.innerHTML = `${day}/${month}-${year}`;

let hours = today.getHours();
let minutes = today.getMinutes();
time.innerHTML = `${hours}:${minutes}`;

const cities = document.querySelectorAll("button");
cities.forEach(city => {
  city.addEventListener("click", e => {
    cities.forEach(city => {
      city.classList.remove("active");
    });

    e.currentTarget.classList.add("active");

    let longitude = city.dataset.longitudeValue;
    let latitude = city.dataset.latitudeValue;

    let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;
    getWeather(url);
    // another function here to display and append the data?
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
      let temp;
      let rain;

      for (let i = 0; i < currentTime.parameters.length; i++) {
        if (currentTime.parameters[i].name === "t") {
          temp = currentTime.parameters[i].values[0];
        }

        if (currentTime.parameters[i].name === "pcat") {
          rain = currentTime.parameters[i].values[0];
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
// https://www.latlong.net/
