const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');
const RoleModel = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'roles',
    timestamps: false,
})
module.exports = RoleModel;