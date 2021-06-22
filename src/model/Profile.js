const { Model, DataTypes } = require('sequelize')
const database = require('../database/index')
const Account = require('./Account')

class Profile extends Model{}

Profile.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age:{
        type:DataTypes.SMALLINT,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: database,
    modelName: 'Profile',
    tableName: 'profiles'
})

//Profile.Account = Profile.belongsTo(Account)

module.exports = Profile