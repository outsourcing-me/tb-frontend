const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const SECRET = require('./const.js').SECRET

const app = express()
const router = require('./router.js')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000000 }
}))

app.use('/api', router)

app.listen(process.env.PORT || 3000)
console.log('[Info] mock api server start at ' + (process.env.PORT || 3000))
