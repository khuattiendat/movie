const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');

const categoryModel = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    slug: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'categories',
    timestamps: false,
})
module.exports = categoryModel;
