const express = require('express')
const router = express.Router()
const session = require('express-session')
const Category = require('../model/Category')
const Post = require('../model/Post')
const Account = require('../model/Account')

let id = ""

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
    let posts = await Post.findAll()
    let users = await Account.findAll()

    res.render('pages/admin', {
        user: req.user,
        categories: categories,
        posts: posts,
        users:users
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

router.get("/category/edit/:categoryId", ensureAuthenticated, function(req,res){

    res.render('pages/category_formEdit', {
        user: req.user,
        id: req.params
    })
})

router.post("/category/edit", ensureAuthenticated, async function(req,res){
    
    console.log(id)
    // let category = Category.findByPk(parseInt(id))
    // category.name = req.body.categoryName
    // category.description = req.body.categoryDescription
    
    // await Category.save()
    
    res.redirect('/admin')
})

router.get("/users/edit/:userId", ensureAuthenticated, function(req,res){

    res.render('pages/user_formEdit', {
        user: req.user,
        id: req.params
    })
})

router.get("/users/remove/:userId", ensureAuthenticated, function(req,res){
    res.redirect('/admin')
})

router.get("/posts/add", ensureAuthenticated, async function(req,res){

    let categories = await Category.findAll()
    
    res.render('pages/post_form', {
        user: req.user,
        categories: categories
    })
})

router.post("/posts/add", ensureAuthenticated, async function(req,res){
    
    let title = req.body.postTitle
    let text = req.body.postText
    let category = parseInt(req.body.postCategory)
    let image = req.body.postImage
    
    let post = await Post.create({
        title: title,
        postText: text,
        CategoryId: category,
        AccountId: req.user.id,
        imageUrl: image

    });
    
    res.redirect('/admin')
})

module.exports = router