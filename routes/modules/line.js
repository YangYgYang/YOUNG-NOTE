const https = require("https")
const express = require('express')
const router = express.Router()
const TOKEN = process.env.LINE_ACCESS_TOKEN

router.get("/", (req, res) => {
    res.send("good")
  })

router.post("/", function(req, res) {
    res.send('its in post webhook route')
    if (req.body.events[0].type === "message") {
        // Message data, must be stringified
        const dataString = JSON.stringify({
          replyToken: req.body.events[0].replyToken,
          messages: [
            {
              "type": "text",
              "text": "Hello, user"
            },
            {
              "type": "text",
              "text": "May I help you?"
            }
          ]
        })
    
        // Request header
        const headers = {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + TOKEN
        }
    
        // Options to pass into the request
        const webhookOptions = {
          "hostname": "api.line.me",
          "path": "/v2/bot/message/reply",
          "method": "POST",
          "headers": headers,
          "body": dataString
        }
    
        // Define request
        const request = https.request(webhookOptions, (res) => {
          res.on("data", (d) => {
            process.stdout.write(d)
          })
        })
    
        // Handle error
        request.on("error", (err) => {
          console.error(err)
        })
    
        // Send data
        request.write(dataString)
        request.end()
      }
  })

  module.exports = router