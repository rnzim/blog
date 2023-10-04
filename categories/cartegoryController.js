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
            res.redirect('/admin/categories')
        })
     }else{
        res.redirect('/admin/categories/new')
     }
})
router.get('/admin/categories/',(req,res)=>{
    Category.findAll({
       raw:true, order:[['id','desc']]
    }).then((categories)=>{
        res.render('admin/categories/index.ejs',{categories:categories})

        //degug
        categories.forEach(categories => {
            console.log('\n\u001b[32m Cartegorias: \n')
            console.log('\u001b[37m Categoria: '+categories.id+ '\u001b[33m  Nome: '+categories.title)
        })
    })
   
})
router.post('/categories/delete',(req,res)=>{
    var id = req.body.id
    if(id == undefined){
        res.redirect('/admin/categories/ban')
    }
    else{
        if(!isNaN(id)){
            
            Category.destroy({
                where:{id:id}
            }).then(()=>{
                res.redirect('/admin/categories/')
            })
            
             
        }
        else{
            res.redirect('/admin/categories/ban') 
        }
    }
    
   
})
router.get('/admin/categories/ban',(req,res)=>{
    res.render('admin/categories/ban')
})

router.get('/admin/categories/edit/:id',(req,res)=>{
    var id = req.params.id
    if(isNaN(id)){
        res.redirect('admin/categories/')
    }
    Category.findByPk(id).then((category)=>{
        res.render('admin/categories/edit.ejs',{category:category})
    }).catch((err)=>{
        res.redirect('admin/categories/')
    })
})

router.post('/admin/categories/update/',(req,res)=>{
    var id = req.body.id
    var title = req.body.title
    Category.update({title:title,slug:slugify(title)},
       { where:{
            id:id
        
    }

    }).then(()=>{
      res.redirect('/admin/categories')
    })
})
module.exports = router