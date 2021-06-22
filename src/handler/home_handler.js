const express = require('express')
const router = express.Router()
const auth = require('../service/auth')
const flash = require('connect-flash')
const bcrypt = require('bcrypt')
const session = require('express-session')

router.use(flash())
router.use(session({
    secret:process.env.SESSION_SECRET,
}))

router.use(auth.initialize())
router.use(auth.session())

router.get("/", function(req,res){
    res.render('pages/home', {user: req.user})
})


router.get('/login', function(req, res) {
    res.render('pages/login', {user: req.user, error: req.flash('error')[0]})
})

router.post('/login',
    auth.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.post('/logout', function(req, res) {

})

router.get('/register', function(req, res) {
    res.render('pages/register', {user: req.user})
})

router.post('/register', function(req, res) {
    
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

module.exports = router