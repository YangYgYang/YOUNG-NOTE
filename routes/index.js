const https = require('https')
const express = require('express')
const app = express()
const router = express.Router()
const home = require('./modules/home')
const line = require('./modules/line')

router.use('/webhook', line)
router.use('/', home)





module.exports = router