const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');
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
    account_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'often',
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2
    },
    url_image: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'users',
    timestamps: true,
})
module.exports = UserModel;