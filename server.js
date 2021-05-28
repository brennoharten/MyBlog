const express = require('express')
//const User = require('./src/model/User.js')
const Account = require('./src/model/Account.js')
const Profile = require('./src/model/Profile.js')
//const faker = require('faker')

const app = express()
const port = 8080
const session = require('expresse-session')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')

const auth = require('./src/service/auth/auth')
const bcrypt = require('bcrypt');
const saltRounds = 12;

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
    async function(username, password, done) {
        
        let account = await Account.findOne({
            where:{
                username:username
            }
        })

        if (account == null) {
            return done(null, false, {message: "Invalid username"})
            res.send("deu errado")
        }

        bcrypt.compare(password, account.password, function(err, result){
            if(result){
                //todo criar sessão
                return done(null, account)
            } else {
                return done(null, false, {message: "Invalid password"})
            }
        })
    }
));

app.use('/public', express.static('public'))

app.use(express.cookieParser())
app.use(session({
    secret:"1234567890123456"
}))
app.use(passport.initialize())
app.use(passport.session())



app.get("/", function(req,res){
    res.render('pages/home')
})

app.get('/login', function(req, res) {
    res.render('pages/login')
})

app.post('/login', async function(req, res) {

    let username = req.body.username
    let password = req.body.password

    let account = await Account.findOne({
        where:{
            username:username
        }
    })

    if(account != null) {
        bcrypt.compare(password, account.password, function(err, result){
            if(result){
                //todo criar sessão
                res.redirect('/')
            }
        })
    }else {
        res.send("deu errado")
    }

})

app.post('/logout', function(req, res) {

})

app.get('/register', function(req, res) {
    res.render('pages/register')
})

app.post('/register', function(req, res) {
    
    console.log(req.body)
    
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let passwordConfirmation = req.body.passwordConfirmation

    if(password === passwordConfirmation) {

        bcrypt.hash(password, saltRounds, function(err, hash) {
            Account.create({
                username: username,
                email:email,
                password:hash
            })
            res.redirect('/login')
        });
        

    } else {
        res.send("senhas diferentes")
    }

})

app.listen(port, async function(){
    console.log(`Server is running at port:${port}`)
})