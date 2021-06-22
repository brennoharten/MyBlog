const { Model, DataTypes } = require('sequelize')
const database = require('../database/index')
const Post = require('./Post')
class Category extends Model{}

Category.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: database,
        modelName: 'Category',
        tableName: 'categories'
    })

Category.Post = Category.hasMany(Post)

module.exports = Category