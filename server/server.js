const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, '../public/')))

app.get('/styles', (req,res)=>{
  res.sendFile(path.join(__dirname,'../public/index.css'))
})

app.get('/js', (req,res)=>{
  res.sendFile(path.join(__dirname,'../public/index.js'))
})

app.get('/login', (req,res)=>{
  res.sendFile(path.join(__dirname,'../public/login.html'))
})

app.get('/aboutUs', (req,res)=>{
  res.sendFile(path.join(__dirname,'../public/aboutUs.html'))
})
app.get('/createAccount', (req,res)=>{
  res.sendFile(path.join(__dirname,'../public/createAccount.html'))
})
app.get('/loginjs', (req,res)=>{
  res.sendFile(path.join(__dirname,'../public/login.js'))
})


const port = process.env.PORT || 5050

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})