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

app.get('/login', function(req, res) {
    res.render('pages/login')
})

app.post('/login', function(req, res) {
  
})

app.post('/logout', function(req, res) {
  
})

app.get('/register', function(req, res) {
    res.render('pages/register')
})

app.post('/register', function(req, res) {
  
})

app.listen(port, async function(){
    console.log(`Server is running at port:${port}`)
})