const app = require('./server')

const PORT = process.env.PORT || 8081

app.listen(PORT, function (err) {
  if (err) {
    console.log('there was a problem', err)
    return
  }
  console.log(`App working and listening on ${PORT}`)
})
