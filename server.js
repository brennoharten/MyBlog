require('dotenv').config()
const express = require('express')
const auth = require('./src/service/auth')
const homeHandler = require('./src/handler/home_handler')
const adminHandler = require('./src/handler/admin_handler')

const Account = require('./src/model/Account')
const Profile = require('./src/model/Profile')
const Category = require('./src/model/Category')
const Post = require('./src/model/Post')

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/public', express.static('public'))
app.use('/', homeHandler)
app.use('/admin', adminHandler)


app.use(cookieParser())
app.set('view engine', 'ejs')

const port = 8080

app.listen(port, async function(){
    console.log(`Server is running at port:${port}`)
})