const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
      type: Sequelize.STRING,
      allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})
Category.hasMany(Article) // Uma Cartegoria Tem Muitos Artigos
Article.belongsTo(Category) //um artigo pertence a uma cartegoria

Article.sync({force: false})
module.exports = Article
