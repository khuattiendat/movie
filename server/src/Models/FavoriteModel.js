const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');
const FavoriteModel = sequelize.define('favorites', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    movie_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'favorites',
    timestamps: false
});
module.exports = FavoriteModel;