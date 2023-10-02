const Sequelize = require('sequelize')

const connection = new Sequelize('blogxp','root','',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = connection