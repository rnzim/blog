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
    res.render('index.ejs')
})

app.listen(10,()=>{
    console.log('\u001b[33mServer Running on \u001b[36mPort 12')
})

connection.authenticate().then(()=>{
   console.log('\u001b[37mconnection with database \u001b[34msuccessful')
}).catch((erro)=>{
     console.log(erro)
})