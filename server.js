require('dotenv').config()
const express = require('express')

const User = require('./src/model/User.js')
const Account = require('./src/model/Account.js')
const Profile = require('./src/model/Profile.js')

const auth = require('./src/service/auth')
const homeHandler = require('./src/handler/home_handler')

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/public', express.static('public'))
app.use('/', homeHandler)


app.use(cookieParser())
app.set('view engine', 'ejs')

const port = 8080

app.listen(port, async function(){
    console.log(`Server is running at port:${port}`)
})