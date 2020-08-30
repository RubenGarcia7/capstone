// Setup empty JS object to act as endpoint for all routes
const appData = {}
entry = 0;

// Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, err => {
  if (err) {
    console.log('there was a problem', err)
    return
  }
  console.log(`Listening on ${PORT}`)
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

// Initialize the main project folder
app.use(express.static('public'))

// Initialize all route with a callback function
app.get('/all', sendAppData)

// Callback function to complete GET '/all'
function sendAppData(req, res) {
  res.send(appData)
}

// Post Route  
app.post('/sendInfo', addInfo)

function addInfo(req, res) {
  console.log(req.body)
  const data = req.body

  newEntry = {
    city: data.city,
    date: data.date,
    temperature: data.temperature,
    message: data.message
  }

  appData[entry] = newEntry;

  res.send({
    message: "POST request is successful"
  })
}