const Sequelize = require('sequelize')

const connection = new Sequelize('blogxp','root','',{
    host:'localhost',
    dialect:'mysql',
    timezone: '-03:00'
})

module.exports = connection