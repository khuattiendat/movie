const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');
const WatchHistoryModel = sequelize.define('watch_history', {
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
    tableName: 'watch_history',
    timestamps: false
});
module.exports = WatchHistoryModel;