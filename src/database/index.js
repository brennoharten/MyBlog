const { Sequelize } = require('sequelize');
const db =  new Sequelize('postgres://postgres:postgres@localhost:5432/myblog')

//db.sync({force: true})
db.sync()

module.exports = db