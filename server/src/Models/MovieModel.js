const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');
const CategoryMovieModel = require('./CategoryMovieModel');
const ActorMovieModel = require('./ActorMovieModel');
const CategoryModel = require('./CategoryModel');
const ActorModel = require('./ActorModel');
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
    year: {
        type: DataTypes.STRING
    },
    content: {
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
    timestamps: true,
    paranoid: true,
});
// Define associations
Movie.belongsToMany(CategoryModel, {through: CategoryMovieModel, foreignKey: 'movie_id'});
CategoryModel.belongsToMany(Movie, {through: CategoryMovieModel, foreignKey: 'category_id'});
Movie.belongsToMany(ActorModel, {through: ActorMovieModel, foreignKey: 'movie_id'});
ActorModel.belongsToMany(Movie, {through: ActorMovieModel, foreignKey: 'actor_id'});
module.exports = Movie;