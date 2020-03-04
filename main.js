"use strict";

// Gothenburg lon + lat
const longitude = "11.974560";
const latitude = "57.708870";
const container = document.querySelector(".container");
const date = document.querySelector(".date");

//const today = new Date();
const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
date.innerHTML = `${day}/${month}-${year}`;

const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

// Check for rain
const doesItRain = x => {
  if (x === 3) {
    return true;
  } else {
    return false;
  }
};

fetch(url)
  .then(response => {
    return response.json();
  })
  .then(json => {
    // should be set to [0] to get the current date/time
    const currentTime = json.timeSeries[55];
    const temp = currentTime.parameters[1].values[0];
    const rain = currentTime.parameters[15].values[0];

    if (doesItRain(rain)) {
      console.log("RAIN :(");
      //const icon = "<i class='fas fa-cloud-rain'></i>";
      const icon = "🌧";
      container.innerHTML = icon;
    } else {
      console.log("NO RAIN :)");
      //const icon = "<i class='far fa-sun'></i>";
      const icon = "☀️";
      container.innerHTML = icon;
    }

    const temperature = document.createElement("P");
    temperature.innerHTML = `${temp} °C`;
    container.appendChild(temperature);

    console.log(`Temperature in Gothenburg right now: ${temp} °C`);
  });

// https://opendata.smhi.se/apidocs/metfcst/parameters.html
// https://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-pcat
