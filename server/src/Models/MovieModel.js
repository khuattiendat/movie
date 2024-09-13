const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    release_year: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    },
    quality: { // 720p, 1080p, 4k
        type: DataTypes.INTEGER
    },
    duration: { // in minutes
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.FLOAT
    },
    url_image: {
        type: DataTypes.STRING
    },
    url_video: {
        type: DataTypes.STRING
    },
    slug: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'movies',
    timestamps: true
});
module.exports = Movie;