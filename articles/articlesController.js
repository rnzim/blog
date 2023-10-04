const express = require('express')
const router = express.Router()

router.get("/articles",(req,res)=>{
    res.send('aqui fica os artigos')
})

router.get("/newarticle",(req,res)=> {
    res.send('aqui fica um novo article')
})

router.get('/articles/new',(req,res)=>{
    res.render('admin/articles/new.ejs')
})
module.exports = router