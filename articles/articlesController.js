const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('./Article')
const slug = require('slugify')
const adminUser = require('../middleware/authUse')

router.get('/articles',adminUser,(req,res)=>{
  Article.findAll({
    order:[['id','desc']],
    include:[{model:Category}]
   }).then((articles)=>{

    res.render('admin/articles/index.ejs',{article:articles})
  })
  
})
router.get('/articles/new',adminUser,(req,res)=>{
    Category.findAll().then((category)=>{
        res.render('admin/articles/new.ejs',{category:category})
    })
   
})
router.post('/articles/save',adminUser,(req,res)=>{
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
router.post('/articles/delete',adminUser,(req,res)=>{
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

router.get('/article/edit/:id',adminUser,(req,res)=>{
  Category.findAll().then((category)=>{
      var id = req.params.id
      Article.findByPk(id).then((article)=>{
          res.render('admin/articles/edit.ejs',{category:category,article:article})
      })
      
  })
     
})


router.post('/articles/edit/save',adminUser,(req,res)=>{
  var title = req.body.title
  var body = req.body.body
  var categoryId = req.body.category
  console.log('\u001b[31m '+ categoryId)
  var id = req.body.id
  Article.update({ 
      title:title,
      body:body,
      categoryId:categoryId},
       { where:{
         
         id:id
          
      }
  }).then(()=>{
      console.log('article update')
      res.redirect('/articles')
  })
})


module.exports = router