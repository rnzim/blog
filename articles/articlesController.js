const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')

router.get("/articles",(req,res)=>{
    res.send('aqui fica os artigos')
})

router.get("/newarticle",(req,res)=> {
    res.send('aqui fica um novo article')
})

router.get('/articles/new',(req,res)=>{
    Category.findAll({raw:true}).then((category)=>{
        res.render('admin/articles/new.ejs',{category:category})
    })
   
})
module.exports = router