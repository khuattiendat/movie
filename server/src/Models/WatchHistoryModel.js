const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');
const WatchHistoryModel = sequelize.define('watch_histories', {
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
    watched_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'watch_histories',
    timestamps: false
});