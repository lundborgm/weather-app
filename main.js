"use strict";

const cities = document.querySelector(".cities");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const test = document.querySelector(".test");
const test2 = document.querySelector(".test2");
const container = document.querySelector(".container");
let longitude;
let latitude;
const today = new Date();
let day = today.getDate();
const month = today.getMonth() + 1;
let week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let months = [
  "DEC",
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV"
];
let weekday = week[today.getDay()];
const currentMonth = months[month];
test.innerHTML = weekday;
date.innerHTML = day;
test2.innerHTML = currentMonth;

//let hours = today.getHours();
//let minutes = today.getMinutes();
//time.innerHTML = `${hours}:${minutes}`;

function selectLocation() {
  const city = cities.options[cities.selectedIndex];
  longitude = city.dataset.longitude;
  latitude = city.dataset.latitude;

  let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;
  getWeather(url);
  selectDate();
  // add another function here to display and append the data?
}

function selectDate() {
  const previous = document.querySelector(".previous-day");
  const next = document.querySelector(".next-day");

  next.addEventListener("click", () => {
    if (date.innerHTML >= today.getDate()) {
      previous.classList.remove("hide");
    }
    day++;
    date.innerHTML = day;
  });

  previous.addEventListener("click", () => {
    if (date.innerHTML > today.getDate()) {
      day--;
      date.innerHTML = day;
      if (date.innerHTML == today.getDate()) {
        previous.classList.add("hide");
      }
    }
  });
}

// Check for rain
function doesItRain(x) {
  if (x === 3) {
    return true;
  } else {
    return false;
  }
}

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
        const icon = "🌧";
        container.innerHTML = icon;
      } else {
        const icon = "☀️";
        container.innerHTML = icon;
      }

      const temperature = document.createElement("P");
      temperature.classList.add("temperature");
      temperature.innerHTML = `${temp} °C`;
      container.appendChild(temperature);
    });
}

cities.addEventListener("change", selectLocation);

// Create an init function where you run this?
selectLocation();

// https://opendata.smhi.se/apidocs/metfcst/parameters.html
// https://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-pcat
// https://www.latlong.net/
