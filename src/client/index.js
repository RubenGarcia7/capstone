// Import SASS styles
import './styles/main.scss';

// Code to split later

// Form Elements
const destination = document.getElementById('city');
const dateDepart = document.getElementById('date-depart');
const dateReturn = document.getElementById('date-return');
const countryList = document.getElementById('countries');
const form = document.getElementById('form');

// UI Elements
const countdownUI = document.getElementById('countdown');
const cityUI = document.getElementById('city-span');
const weatherCity = document.getElementById('weather-city');
const weatherDate = document.getElementById('weather-date');
const weatherTitle = document.getElementById('weather-title');
const weatherMaxTemp = document.getElementById('weather-maxtemp');
const weatherMinTemp = document.getElementById('weather-mintemp');
const weatherImg = document.getElementById('weather-img');
const cityImg = document.getElementById('city-img');


// Other Global Variables
let differenceDays;
let city;


document.addEventListener('submit', performAction);

// Function triggered after submiting the form
function performAction(event) {
  event.preventDefault();

  const userDestination = destination.value;
  const userDateDepart = dateDepart.value;
  const userDateReturn = dateReturn.value;
  const userCountry = countryList.value;

  validateForm(userDestination);

  createCountdown(userDateDepart, userDestination);

  getCityData(userCountry, userDestination, userDateDepart)
    .then(geoData => getWeatherData(geoData, userDateDepart))
    .then(newData => getImgData(newData));
}

const getWeatherData = async (geoData, userDateDepart) => {
  console.log(geoData);

  const lat = geoData.geonames[0].lat;
  const lon = geoData.geonames[0].lng;

  try {
    const res = await fetch(`http://localhost:8081/weather/${lat}/${lon}`);
    const data = await res.json();
    console.log(data)

    // Update UI
    const city = data.city_name;

    weatherCity.innerHTML = city + ', ' + data.country_code;
    weatherDate.innerHTML = userDateDepart.split('-').reverse().join('/');
    weatherMaxTemp.innerHTML = data.data[differenceDays].max_temp + '°C';
    weatherMinTemp.innerHTML = data.data[differenceDays].min_temp + '°C';
    weatherTitle.innerHTML = data.data[differenceDays].weather.description;
    weatherImg.src = `https://www.weatherbit.io/static/img/icons/${data.data[differenceDays].weather.icon}.png`

    return data;

  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }

}

// Fetch text data from API
export const getCityData = async (userCountry, userDestination, userDateDepart) => {

  try {
    const res = await fetch(`http://localhost:8081/city/${userCountry}/${userDestination}`);
    const data = await res.json();

    // Update UI
    cityUI.innerHTML = data.geonames[0].name;
    countdownUI.innerHTML = differenceDays;

    return data;

  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}

const getImgData = async (newData) => {

  const city = newData.city_name;

  try {
    const res = await fetch(`http://localhost:8081/img/${city}`);
    const data = await res.json();
    console.log(data)

    // Get img url from JSON response
    const imgURL = data.hits[0].webformatURL;
    console.log(imgURL);

    // Update UI
    cityImg.src = imgURL;

    return data;

  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }

}


// Validate Form
function validateForm(userDestination) {

  if (userDestination === '' || userDestination === null) {
    alert('Please add your destination');
    return;
  } else {
    return true;
  }
}

// Countdown Timer
function createCountdown(userDateDepart, userDestination) {
  // Get today's date
  const today = new Date();

  // Create data object for the date entered by the user
  const userDateDepartFormatted = new Date(userDateDepart);

  // Calculate the time difference in milisecons
  const differenceMs = userDateDepartFormatted.getTime() - today.getTime();

  // Convert the difference to days and round the number
  differenceDays = Math.ceil(differenceMs / 1000 / 60 / 60 / 24);

  // Make sure the date entered is in the future
  if (differenceDays <= 0) {
    alert('Please select a future date');
    return;
  }
}