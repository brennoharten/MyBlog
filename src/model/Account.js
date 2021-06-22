const { Model, DataTypes } = require("sequelize");
const database = require("../database/index");
const Post = require("./Post");
const Profile = require("./Profile");
class Account extends Model {}

Account.init(
    {
        username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
            password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: database,
        modelName: "Account",
        tableName: "accounts",
    }
);

Account.Post = Account.hasMany(Post);

module.exports = Account;
