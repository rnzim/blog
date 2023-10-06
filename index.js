const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const categoryController = require('./categories/cartegoryController')
const articleController = require('./articles/articlesController')

const Category = require('./categories/Category')
const Article = require('./articles/Article')

app.set("view engine","ejs")
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))

app.use('/',categoryController)

app.use('/',articleController)


app.get("/",(req,res)=>{
    Article.findAll({
        raw:true,
        order:[['id','desc']]
    }).then((articles)=>{
        Category.findAll().then((category)=>{
            res.render('index.ejs',{articles:articles,categories:category})
        })
       
    })
   
})
app.get("/:slug",(req,res)=>{
    var slug = req.params.slug
    Article.findOne({
       where:{
           slug:slug
       }
    }).then((article)=>{
        Category.findAll().then((category)=>{
            res.render('article.ejs',{article:article,categories:category})
        })
      
    })
})



app.get('/category/:slug',(req,res)=>{
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

app.get('/article/edit/:id',(req,res)=>{
    Category.findAll().then((category)=>{
        var id = req.params.id
        Article.findByPk(id).then((article)=>{
            res.render('admin/articles/edit.ejs',{category:category,article:article})
        })
        
    })
       
})


app.post('/articles/edit/save',(req,res)=>{
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


connection.authenticate().then(()=>{
   console.log('\u001b[37mconnection with database \u001b[34msuccessful')
}).catch((erro)=>{
     console.log(erro)
})


app.listen(10,()=>{
    console.log('\u001b[33mServer Running on \u001b[36mPort 12')
})