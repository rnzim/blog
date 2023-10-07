const express = require('express')
const router = express.Router()
const connection = require('../database/database')
const sequelize = require('sequelize')
const User = require('./User')


router.get('/admin/create',(req,res)=>{
    res.render('admin/user/newUser.ejs')
})
router.post('/admin/create/save',(req,res)=>{
   var name = req.body.name
})

module.exports = router