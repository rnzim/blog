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

app.get('/page/:num',(req,res)=>{
    var page = req.params.num
    var offset = 0
    if(isNaN(page) || page == 1){
        offset = 0
    }else{
        offset = parseInt(page) * 3
    }
    Article.findAndCountAll({
        limit:4,
        offset:offset
    }).then((article)=>{
        var next = false;

        if(offset +4 >= article.count){
                next = false
        }else{
            next = true
        }
        var result={
            article:article,
            next:next
        }
        Category.findAll().then((category)=>{
            res.render('admin/articles/page.ejs',{result:result,categories:category})
        })
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