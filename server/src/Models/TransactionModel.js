const {DataTypes} = require('sequelize');
const {sequelize} = require('../Configs/connect');
const TransactionModel = sequelize.define('transactions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
}, {
    tableName: 'transactions',
    timestamps: true,
    paranoid: true,
})
module.exports = TransactionModel