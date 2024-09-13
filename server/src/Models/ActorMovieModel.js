const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');
const ActorMovieModel = sequelize.define('movie_actors', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    actor_id: {
        type: DataTypes.INTEGER
    },
    movie_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'movie_actors',
    timestamps: false
});
module.exports = ActorMovieModel;