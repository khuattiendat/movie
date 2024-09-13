const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');

const CategoryMovie = sequelize.define('movie_categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: DataTypes.INTEGER
    },
    movie_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'movie_categories',
    timestamps: false
});
module.exports = CategoryMovie;