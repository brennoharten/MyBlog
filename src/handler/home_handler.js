const express = require('express')
const router = express.Router()
const auth = require('../service/auth')
const flash = require('connect-flash')
const session = require('express-session')
const bcrypt = require('bcrypt')

const Account = require('../model/Account')
const Category = require('../model/Category')

router.use(flash())
router.use(session({
    secret:process.env.SESSION_SECRET,
}))

router.use(auth.initialize())
router.use(auth.session())

router.get("/", async function(req,res){

    let categories = await Category.findAll()

    res.render('pages/home', {
        user: req.user, 
        categories: categories})
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
    let cellphone = req.body.cellphone
    let password = req.body.password
    let passwordConfirmation = req.body.passwordConfirmation

    if(password === passwordConfirmation) {

        bcrypt.hash(password, 12, async function(err, hash) {
            
            let account = await Account.create({
                username: username,
                email:email,
                cellphone: cellphone,
                password:hash
            })
            res.redirect('/login')
        });
        

    } else {
        res.send("senhas diferentes")
    }

})

module.exports = router