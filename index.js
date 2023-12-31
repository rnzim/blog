const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const categoryController = require('./categories/cartegoryController')
const articleController = require('./articles/articlesController')
const userController = require('./user/UserController')
const Category = require('./categories/Category')
const Article = require('./articles/Article')
const session = require('express-session')

//view template engine
app.set("view engine","ejs")
//folder static
app.use(express.static('public'))

//enviar dados do formulario para o servidor
app.use(bodyParser.urlencoded({extended:false}))

app.use(session({
    secret:'phpelento',
    cookie: {maxAge: 60*60*1000},
    resave: true,
    saveUninitialized: true
}))

//controllers
app.use('/',categoryController)
app.use('/',userController)
app.use('/',articleController)

//rotas
app.get("/",(req,res)=>{
    Article.findAll({
        raw:true,
        limit:4,
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
    var page = parseInt(req.params.num)
    var offset = 0
    
    if(isNaN(page) || page == 1){
        offset = 0
    }else{
        offset = (parseInt(page)-1) * 4
    }
    if(!isNaN(page)){
        Article.findAndCountAll({
            limit:4,
            offset:offset,
            order:[['id','desc']]
        }).then((article)=>{
            var next = false;

            if(offset +4 >= article.count){
                    next = false
            }else{
                next = true
            }
            var result={
                article:article,
                next:next,
                page:page
            }
            Category.findAll().then((category)=>{
                res.render('admin/articles/page.ejs',{result:result,categories:category})
            })
        
    })
}else{
    res.redirect('/page/1')
}
    

})

connection.authenticate().then(()=>{
   console.log('\u001b[37mconnection with database \u001b[34msuccessful')
}).catch((erro)=>{
     console.log(erro)
})


app.listen(10,()=>{
    console.log('\u001b[33mServer Running on \u001b[36mPort 12')
})