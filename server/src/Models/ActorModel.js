const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');
const ActorModel = sequelize.define('actors', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'actors',
    timestamps: false,
})
module.exports = ActorModel;