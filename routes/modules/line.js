const https = require("https")
const express = require('express')
const router = express.Router()
const TOKEN = process.env.LINE_ACCESS_TOKEN

router.get("/", (req, res) => {
    res.send("change branch")
  })

router.post("/", function(req, res) {
    res.send('its in post webhook route')
    console.log(req.body)
    console.log(req.body.events[0].message)
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

  //req.body
    // {destination: 'Ua6c629d804d64822d2233a99af4d095b',
    // events: [
    // {
    // type: 'message',
    // message: [Object],
    // webhookEventId: '01GGH66EDG1JSDWM0EMGPKZS6W',
    // deliveryContext: [Object],
    // timestamp: 1667024238548,
    // source: [Object],
    // replyToken: 'a65cb959310545e4b613d9045253a5a9',
    // mode: 'active'
    // }
    // ]
    // }