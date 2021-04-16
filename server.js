const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const User = require('./src/model/User.js')
//const faker = require('faker')

const app = express()
const port = 8080
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))

app.use('/public', express.static('public'))

app.get("/", function(req,res){
    res.render('pages/home')
})

app.get("/users", async function(req,res){
  const users = await User.findAll()
  res.send(JSON.stringify(users))
})

app.post("/user", async function(req,res){
  const user = await User.create({
    firstName: "brenno",
    lastName: "harten",
    age: 20,
    email: "brennoharten",
    isActive: true
  })
  res.send(JSON.stringify(user))
})


app.listen(port, async function(){
    console.log(`Server is running at port:${port}`)
})