var path = require('path')
const express = require('express')
const fetch = require('node-fetch')

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8081

//Set up environment variables

const app = express()

app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// designates what port the app will listen to for incoming requests
app.listen(PORT, function (err) {
  if (err) {
    console.log('there was a problem', err)
    return
  }
  console.log(`App working and listening on ${PORT}`)
})

app.get('/test', function (req, res) {
  res.send('Hello')
})


// Geonames API
app.get('/city/:country/:city', (req, res) => {
  const username = process.env.GEONAMES_USER;
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
// http://api.geonames.org/search?name=London&country=GB&maxRows=10&username=rubengar97


// Weatherbit API
app.get('/weather/:lat/:lon', (req, res) => {
  const weatherKey = process.env.WEATHER_KEY;
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
// https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543&key=1f2d42f0a90b42fba4e3b9d3ae15d5a7