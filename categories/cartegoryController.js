const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')

router.get('/admin/categories/new',(req,res)=>{
    res.render('admin/categories/new.ejs')
})

router.post('/cartegories/save',(req,res) =>{
     var title = req.body.title
     if(title != undefined){
        Category.create({
            title:title,
            slug:slugify(title)
        }).then(()=>{
            res.redirect('/')
        })
     }else{
        res.redirect('/admin/categories/new')
     }
})
router.get('/admin/categories/',(req,res)=>{
    Category.findAll({
       raw:true, order:[['id','desc']]
    }).then((cartegories)=>{
        cartegories.forEach(cartegories => {
            console.log(cartegories.title)
        })
    })
    res.render('admin/categories')
})
module.exports = router