const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('./Article')
const slug = require('slugify')

router.get("/article/read/:id",(req,res)=>{
     id = req.params.id
     res.send(id)
})

router.get('/articles',(req,res)=>{
  Article.findAll().then((articles)=>{
    res.render('admin/articles/index.ejs',{article:articles})
  })
  
})
router.get('/articles/new',(req,res)=>{
    Category.findAll({raw:true}).then((category)=>{
        res.render('admin/articles/new.ejs',{category:category})
    })
   
})
router.post('/articles/save',(req,res)=>{
    var title = req.body.title
    var body = req.body.body
    var category =  req.body.category
     
    Article.create({
        title:title,
        slug:slug(title),
        body:body,
        cartegoryId: category

    }).then(()=>{
        res.redirect('/')
    })
   
})
module.exports = router