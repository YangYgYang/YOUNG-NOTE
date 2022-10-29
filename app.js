const https = require("https")
const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN

//==========template engine
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//==========setting static files
app.use(express.static('public'))

//==========line bot setting
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

const routes = require('./routes')
app.use(routes)



app.listen(PORT, () => {
    console.log(`LINE-NOTE app listening at http://localhost:${PORT}`)
  })