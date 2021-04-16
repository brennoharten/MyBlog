const { Model, DataTypes } = require('sequelize')
const database = require('../database/index')

class User extends Model{}

User.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false

    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false

    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 0

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false

    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true

    }
}, {
    sequelize: database,
    modelName: 'users'
})

module.exports = User