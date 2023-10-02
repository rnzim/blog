const express = require('express')
const router = express.Router()

router.get("/articles",(req,res)=>{
    res.send('aqui fica os artigos')
})

router.get("/newarticle",(req,res)=> {
    res.send('aqui fica um novo article')
})

module.exports = router