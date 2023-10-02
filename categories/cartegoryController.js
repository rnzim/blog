const express = require('express')
const router = express.Router()

router.get('/category',(req,res)=>{
    res.send('rota de cartegoria')
})

router.get('/newCategory',(req,res)=>{
    res.send('rota para nova cartegoria')
})

module.exports = router