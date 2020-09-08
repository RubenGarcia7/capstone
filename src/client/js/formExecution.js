import {
  destination,
  dateDepart,
  dateReturn,
  countryList,
  cityUI,
  countdownUI,
  weatherCity,
  form,
  weatherDate,
  weatherTitle,
  weatherMaxTemp,
  weatherMinTemp,
  weatherImg,
  cityImg,
  differenceDaysDep
} from './variables'


export function addEventListener () {
  
  form.addEventListener('submit', performAction);
}

// Function triggered after submiting the form
export function performAction(e) {
  e.preventDefault();
  
  // Get user variables
  const userDestination = destination.value;
  const userDateDepart = dateDepart.value;
  const userDateReturn = dateReturn.value;
  const userCountry = countryList.value;

  // Validate form and update UI
  Client.validateForm(userDestination, userDateDepart, userDateReturn, differenceDaysDep);

  // Get the number of days until departure
  const daysToDepart = countdownUI.innerHTML;

  // API call chain
  getCityData(userCountry, userDestination, userDateDepart)
    .then(geoData => getWeatherData(geoData, userDateDepart, daysToDepart))
    .then(newData => getImgData(newData));
}



// Get city data
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

// Get weather data
export const getWeatherData = async (geoData, userDateDepart, daysToDepart) => {
  console.log(geoData);

  const lat = geoData.geonames[0].lat;
  const lon = geoData.geonames[0].lng;

  try {
    const res = await fetch(`http://localhost:8081/weather/${lat}/${lon}`);
    const data = await res.json();

      console.log(data);

      // Update UI
      const city = data.city_name;
      weatherCity.innerHTML = city + ', ' + data.country_code;
      weatherDate.innerHTML = userDateDepart.split('-').reverse().join('/');
      weatherMaxTemp.innerHTML = data.data[daysToDepart].max_temp + '°C';
      weatherMinTemp.innerHTML = data.data[daysToDepart].min_temp + '°C';
      weatherTitle.innerHTML = data.data[daysToDepart].weather.description;
      weatherImg.src = `https://www.weatherbit.io/static/img/icons/${data.data[daysToDepart].weather.icon}.png`

      return data;
    
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }

};

// Get img data
export const getImgData = async (newData) => {

  const city = newData.city_name;

  try {
    const res = await fetch(`http://localhost:8081/img/${city}`);
    const data = await res.json();
    console.log(data)

    // Get img url from JSON response
    const imgURL = data.hits[0].webformatURL;

    // Update UI
    cityImg.src = imgURL;

    return data;

  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
};
