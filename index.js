const https = require("https")
const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN


app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
    res.sendStatus(200)
  })
app.get("/webhook", (req, res) => {
  console.log('有傳過去')
    res.send("good")
  })

app.post("/webhook", function(req, res) {
    res.send('its in post webhook route')
    console.log("是send嗎")
    console.log(req.body.events)
    console.log(req.body.events.type)
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
      else{
        console.log("錯誤")
      }
  })

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })