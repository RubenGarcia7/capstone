var path = require('path')
const express = require('express')
const fetch = require('node-fetch')

const dotenv = require('dotenv');
dotenv.config();

//Set up environment variables
const app = express()

app.use(express.static('dist'))


// Home route
app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})


/* Dependencies */
const bodyParser = require('body-parser')


/* Middleware*/
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())


// Exporting app to allow Jest endpoint test
module.exports = app


// API Keys Object
const apiKeys = {
  geonames: process.env.GEONAMES_USER,
  weatherbit: process.env.WEATHER_KEY,
  pixabay: process.env.PIXABAY_KEY
}


// Test Route
app.get('/test', async (req, res) => {
    res.json({message: 'Hello'})
})


// Geonames API
app.get('/city/:country/:city', (req, res) => {
  const username = apiKeys.geonames;
  const baseURL = 'http://api.geonames.org/';
  const rows = 1;

  const country = req.params.country;
  const city = req.params.city;

  fetch(`${baseURL}searchJSON?name=${city}&country=${country}&maxRows=${rows}&username=${username}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      res.send(data)
    })
    .catch(err => {
      console.log(err);
    })
})


// Weatherbit API
app.get('/weather/:lat/:lon', (req, res) => {
  const weatherKey = apiKeys.weatherbit;
  const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';

  const lat = req.params.lat;
  const lon = req.params.lon;

  fetch(`${baseURL}&lat=${lat}&lon=${lon}&key=${weatherKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      res.send(data)
    })
    .catch(err => {
      console.log(err);
    })
})

// Pixabay API
app.get('/img/:city', (req, res) => {
  const pixabayKey = apiKeys.pixabay;
  const baseURL = 'https://pixabay.com/api/';

  const city = req.params.city;

  const imgType = 'photo';
  const orientation = 'horizontal';

  console.log(`${baseURL}?key=${pixabayKey}&q=${city}&image_type=${imgType}&orientation=${orientation}`);

  fetch(`${baseURL}?key=${pixabayKey}&q=${city}&image_type=${imgType}&orientation=${orientation}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      res.send(data)
    })
    .catch(err => {
      console.log(err);
    })
})