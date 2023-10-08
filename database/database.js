const Sequelize = require('sequelize')

const connection = new Sequelize('blogxp','root','Iu9byg8sxRMnPVmfVeO2',{
    host:'containers-us-west-100.railway.app',
    dialect:'mysql',
    timezone: '-03:00',
    port: 7262
})

module.exports = connection
