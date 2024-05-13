const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Proveedor = sequelize.define('proveedor', {
  idProveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreProveedor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nitProveedor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailProveedor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccionProveedor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  celularProveedor: {
    type: DataTypes.STRING,
    allowNull: false
  }
    },{
      tableName: 'proveedor',
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
module.exports = Proveedor;