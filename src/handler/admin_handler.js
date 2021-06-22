const express = require('express')
const router = express.Router()
const session = require('express-session')
const Category = require('../model/Category')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {return next();}
    else {
        res.redirect('/login')
    }
}

router.use(session({
    secret:process.env.SESSION_SECRET,
}))

router.get("/", ensureAuthenticated, async function(req,res){

    let categories = await Category.findAll()

    res.render('pages/admin', {
        user: req.user,
        categories: categories
    })
})

router.get("/category/add", ensureAuthenticated, function(req,res){
    res.render('pages/category_form', {user: req.user})
})

router.post("/category/add", ensureAuthenticated, async function(req,res){
    
    let name = req.body.categoryName
    let description = req.body.categoryDescription
    
    let category = await Category.create({
        name: name,
        description: description
    });
    
    res.redirect('/admin')
})

router.get("/posts/add", ensureAuthenticated, function(req,res){
    res.render('pages/post_form', {user: req.user})
})

module.exports = router