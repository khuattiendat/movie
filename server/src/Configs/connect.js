const {Sequelize} = require('sequelize')
require('dotenv').config();
const sequelize = new Sequelize('database_movie', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "+07:00",
});
const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = {
    sequelize,
    connect
};
