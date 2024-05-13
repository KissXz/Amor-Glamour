const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Estilista = sequelize.define('estilista', {
  idEstilista: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipoIdentificacionEstilista: {
    type: DataTypes.STRING,
    allowNull: false
  },
    numIdentificacionEstilista: {
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  nombreEstilista: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidoEstilista: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaNacimientoEstilista: {
    type: DataTypes.DATE,
    allowNull: false
  },
  emailEstilista: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccionEstilista: {
    type: DataTypes.STRING,
    allowNull: false
  },
  celularEstilista: {
    type: DataTypes.STRING,
    allowNull: false
  }
    },{
      tableName: 'estilista',
      timestamps: false
    });
    

// Sincroniza el modelo con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados correctamente');
  })
  .catch(err => {
    console.error('Error al sincronizar modelos:', err);
  });

// Exporta el modelo para usarlo en otros archivos
module.exports = Estilista;