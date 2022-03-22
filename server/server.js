const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, '../public/')))
// app.use(express.static(path.join(__dirname, '../public/index.css')))
// app.use(express.static(path.join(__dirname, '../public/index.js')))

app.get('/styles', (req,res)=>{
  res.sendFile(path.join(__dirname,'../public/index.css'))
})

app.get('/js', (req,res)=>{
  res.sendFile(path.join(__dirname,'../public/index.js'))
})

const port = process.env.PORT || 5050

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})