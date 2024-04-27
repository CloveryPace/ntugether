// database.js
const mysql = require('mysql');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ntugetherdb', 'root', 'secure0123', {
    host: 'localhost',
    dialect: 'mysql'  // this tells Sequelize which database to use
    // logging: console.log,  // Optional: use console.log for seeing the generated SQL queries
    // define: {
    //     freezeTableName: true,  // Optional: this option prevents Sequelize from renaming the tables
    // }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = {
    sequelize, // export the instance
    Sequelize // export the library
};