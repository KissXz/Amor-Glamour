// Conexión a la base de datos
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('amoryglamour', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('Se conecto con la BD Amor&Glamour');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

module.exports = sequelize;