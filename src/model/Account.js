const { Model, DataTypes } = require('sequelize')
const database = require('../database/index')

class Account extends Model{}

Account.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }

},{
    sequelize: database,
    modelName: 'Account',
    tableName: 'accounts'
})

module.exports = Account