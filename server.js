const express = require('express')
const User = require('./src/model/User.js')
const Account = require('./src/model/Account.js')
const Profile = require('./src/model/Profile.js')
const bcrypt = require('bcrypt');
const flash = require('connect-flash');


const passport = require('passport')
const app = express()
const port = 8080
const session = require('express-session')
const cookieParser = require('cookie-parser')


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(flash())


const auth = require('./src/service/auth/auth')
const saltRounds = 12;

const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
    async function(username, password, done) {
        
        let account = await Account.findOne({
            where:{
                username:username
            }
        })

        if (account == null) {
            return done(null, false, {message: "Invalid username or password"})
            res.send("deu errado")
        }

        bcrypt.compare(password, account.password, function(err, result){
            if(result){
                //todo criar sessão
                return done(null, account)
            } else {
                return done(null, false, {message: "Invalid username or password"})
            }
        })
    }
    ));
    
    
    app.use('/public', express.static('public'))
    
    app.use(cookieParser())
    app.use(session({
        secret:"1234567890123456"
    }))
    
    
    
    app.get("/", function(req,res){
        res.render('pages/home', {user: req.user})
    })
    
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        let account = await Account.findOne({
            where:{
                id:id
            }
        })
        done(null, account);

    } catch(err) {
        done(err, account);
    }
});

app.get('/login', function(req, res) {
    res.render('pages/login', {error: req.flash('error')[0]})
})

app.post('/login',
    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

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