const { Model, DataTypes } = require('sequelize')
const database = require('../database/index')

class Post extends Model{}

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize: database,
        modelName: 'Post',
        tableName: 'posts',
    })

module.exports = Post