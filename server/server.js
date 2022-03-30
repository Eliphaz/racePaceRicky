let currentUser = null

const express = require('express')
const bcryptjs = require('bcryptjs')
const path = require('path')
const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, '../public/')))


require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING,{
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })

// const seed = (req,res) => {
//   sequelize.query(`
//   CREATE TABLE users (
//     username varchar(64),
//     password varchar(255),
//     races text
//     );`).then(dbRes => res.status(200).send(dbRes[0]))
//     .catch(err => console.log(err))
// }


// let users = sequelize.query(`select *
// from users;`)
// .then(dbRes => {users = dbRes[0]
// console.log(users)})
// .catch(err => console.log(err))

// app.get('/styles', (req,res)=>{
//   res.sendFile(path.join(__dirname,'../public/index.css'))
// })

// app.get('/js', (req,res)=>{
//   res.sendFile(path.join(__dirname,'../public/index.js'))
// })

// app.get('/login', (req,res)=>{
//   res.sendFile(path.join(__dirname,'../public/login.html'))
// })

// app.get('/aboutUs', (req,res)=>{
//   res.sendFile(path.join(__dirname,'../public/aboutUs.html'))
// })
// app.get('/createAccount', (req,res)=>{
//   res.sendFile(path.join(__dirname,'../public/createAccount.html'))
// })
// app.get('/loginjs', (req,res)=>{
//   res.sendFile(path.join(__dirname,'../public/login.js'))
// })
// app.get('/createAccountjs', (req,res)=>{
//   res.sendFile(path.join(__dirname,'../public/createAccount.js'))
// })

// app.get('/currentUser', (req,res)=>{
//   if(currentUser){
//   return res.status(200).send(currentUser)
// }return res.status(200).send(false)
// })

// app.post('/loginAuth', (req,res)=>{
//   console.log('hit login auth')
//   const { username, password } = req.body
//   userinDb = false
//       for (let i = 0; i < users.length; i++) {
//         if (users[i].username === username && bcryptjs.compareSync(password, users[i].password)) {
//           userinDb = true}
//       }
//       if(userinDb){
//           currentUser = req.body
//           return res.status(200).send(`welcome ${currentUser.username}`)
//         }return res.status(400).send("User not found.") 
// })

// app.put('/createAccountAuth', (req,res)=>{
//   let {password, username} = req.body
//       const salt = bcryptjs.genSaltSync(5)
//       const pinHash = bcryptjs.hashSync(password, salt)

//       req.body.password = pinHash
//   for(i in users){
//     if(users[i].username === username){
//       return res.status(400).send('username already in use')
//     }else{
//       users.push(req.body)
//       sequelize.query(`insert into users (username, password)
//                   values ('${req.body.username}','${req.body.password}');`)
//                   .then(dbRes => res.status(200).send(dbRes[0]))
//                   .catch(err => console.log(err))
//                   return
//     }
//   }
  
 
// })


const port = process.env.PORT || 5050

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})