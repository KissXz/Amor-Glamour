const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Cliente = sequelize.define(
  "cliente",
  {
    idCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipoIdentificacionCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numIdentificacionCliente: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: true,
    },
    nombreCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidoCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaNacimientoCliente: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    emailCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccionCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    celularCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "cliente",
    timestamps: false,
  }
);

// Sincroniza el modelo con la base de datos
sequelize
  .sync()
  .then(() => {
    console.log("Modelos sincronizados correctamente");
  })
  .catch((err) => {
    console.error("Error al sincronizar modelos:", err);
  });

// Exporta el modelo para usarlo en otros archivos
module.exports = Cliente;
