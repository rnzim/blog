const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('./Article')
const slug = require('slugify')


router.get('/articles',(req,res)=>{
  Article.findAll({
    include:[{model:Category}]
   }).then((articles)=>{

    res.render('admin/articles/index.ejs',{article:articles})
  })
  
})
router.get('/articles/new',(req,res)=>{
    Category.findAll().then((category)=>{
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
        categoryId: category

    }).then(()=>{
        res.redirect('/')
    })
   
})
router.post('/articles/delete',(req,res)=>{
   var id = req.body.id
   if(isNaN(id) || undefined){
     res.redirect('/')
   }else{
     Article.destroy({
        where:{
            id:id
        }
     }).then(()=>{
        res.redirect('/articles')
     })
   }
})
module.exports = router