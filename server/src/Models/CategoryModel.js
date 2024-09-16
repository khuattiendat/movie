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
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'categories',
    timestamps: false,
})
module.exports = categoryModel;
