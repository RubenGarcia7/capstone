const app = require('./server')

const PORT = process.env.PORT || 8081

// Listen function initialised in a different file to allow Jest endpoint test
app.listen(PORT, function (err) {
  if (err) {
    console.log('there was a problem', err)
    return
  }
  console.log(`App working and listening on ${PORT}`)
})
