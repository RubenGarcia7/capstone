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
const weatherDurHeading = document.getElementById('weather-dur-heading');
const weatherDurValue = document.getElementById('weather-dur-value');


// Other Global Variables
export let differenceDaysDep;
export let tripDuration;

// document.addEventListener('submit', performAction);

// Function triggered after submiting the form
export function performAction(event) {
  event.preventDefault();

  const userDestination = destination.value;
  const userDateDepart = dateDepart.value;
  const userDateReturn = dateReturn.value;
  const userCountry = countryList.value;

  Client.validateForm(userDestination, userDateDepart, userDateReturn);

  getCityData(userCountry, userDestination, userDateDepart)
    .then(geoData => getWeatherData(geoData, userDateDepart))
    .then(newData => getImgData(newData));

}


export const getWeatherData = async (geoData, userDateDepart) => {
  console.log(geoData);

  const lat = geoData.geonames[0].lat;
  const lon = geoData.geonames[0].lng;

  try {
    const res = await fetch(`http://localhost:8081/weather/${lat}/${lon}`);
    const data = await res.json();
    console.log(data.data[differenceDaysDep]);

    // Update UI
    const city = data.city_name;

    weatherCity.innerHTML = city + ', ' + data.country_code;
    weatherDate.innerHTML = userDateDepart.split('-').reverse().join('/');
    weatherMaxTemp.innerHTML = data.data[differenceDaysDep].max_temp + '°C';
    weatherMinTemp.innerHTML = data.data[differenceDaysDep].min_temp + '°C';
    weatherTitle.innerHTML = data.data[differenceDaysDep].weather.description;
    weatherImg.src = `https://www.weatherbit.io/static/img/icons/${data.data[differenceDaysDep].weather.icon}.png`

    return data;

  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }

};

// Fetch text data from API
export const getCityData = async (userCountry, userDestination, userDateDepart) => {

  try {
    const res = await fetch(`http://localhost:8081/city/${userCountry}/${userDestination}`);
    const data = await res.json();

    // Update UI
    cityUI.innerHTML = data.geonames[0].name;


    return data;

  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
};

export const getImgData = async (newData) => {

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
};
