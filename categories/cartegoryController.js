const express = require('express')
const router = express.Router()
const Category = require('./Category')
const Article = require('../articles/Article')
const slugify = require('slugify')
const adminUser = require('../middleware/authUse')

router.get('/admin/categories/new',adminUser,(req,res)=>{
    res.render('admin/categories/new.ejs')
})

router.post('/cartegories/save',adminUser,(req,res) =>{
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
router.get('/admin/categories/', adminUser, async (req, res) => {
    try {
      const categories = await Category.findAll({
        order: [['id', 'desc']]
      });
  
      const countPromises = categories.map(async (category) => {
        const articleCountCat = await Article.count({
          where: { categoryId: category.id }
        });
        return articleCountCat;
      });
  
      const count = await Promise.all(countPromises);
  
      res.render('admin/categories/index.ejs',{categories:categories,count:count})
    } catch (error) {
      console.error('Erro:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar a contagem.' });
    }
  });
  
router.post('/categories/delete',adminUser,(req,res)=>{
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
router.get('/admin/categories/ban',adminUser,(req,res)=>{
    res.render('admin/categories/ban')
})

router.get('/admin/categories/edit/:id',adminUser,(req,res)=>{
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

router.post('/admin/categories/update/',adminUser,(req,res)=>{
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
router.get('/category/:slug',adminUser,(req,res)=>{
    var slug = req.params.slug
    Category.findOne({
        where:{
            slug:slug
        },
        include:[{model:Article}]
        
    }).then((category)=>{
       Category.findAll().then((categories)=>{

             
             res.render('index.ejs',{articles:category.articles,categories:categories})
         
       })
        

        
    }).catch(err =>{
        res.redirect('/')
    })
})

module.exports = router