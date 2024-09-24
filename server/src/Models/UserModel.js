const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');
const CommentModel = require("./CommentModel");
const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    core: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
}, {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
})
UserModel.hasMany(CommentModel, {foreignKey: 'user_id'});
module.exports = UserModel;