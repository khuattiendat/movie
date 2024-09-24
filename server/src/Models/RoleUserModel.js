const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');
const RoleUserModel = sequelize.define('role_user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'role_user',
    timestamps: false,
})
module.exports = RoleUserModel;