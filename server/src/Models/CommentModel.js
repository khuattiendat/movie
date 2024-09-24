const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');
const CommentModel = sequelize.define('comments', {
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
    },
    content: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'comments',
    timestamps: true
});
module.exports = CommentModel;