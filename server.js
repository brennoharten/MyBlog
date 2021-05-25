const express = require('express')
const User = require('./src/model/User.js')
const Account = require('./src/model/Account.js')
const Profile = require('./src/model/Profile.js')
//const faker = require('faker')

const app = express()
const port = 8080

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')

const auth = require('./src/service/auth/auth')

app.use('/public', express.static('public'))

app.get("/", function(req,res){
    res.render('pages/home')
})

app.get('/login', function(req, res) {
    res.render('pages/login')
})

app.post('/login', function(req, res) {
    res.send(req.body.username)
})

app.post('/logout', function(req, res) {

})

app.get('/register', function(req, res) {
    res.render('pages/register')
})

app.post('/register', function(req, res) {
    
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let passwordConfirmation = req.body.passwordConfirmation

    
    
    /* auth.createAccount()
     */
    res.send(req.body.email)

})

app.listen(port, async function(){
    console.log(`Server is running at port:${port}`)
})