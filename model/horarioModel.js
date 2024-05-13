const { DataTypes } = require("sequelize");
const Estilista = require("../model/estilistaModel");
const sequelize = require("../sequelize");

const Horario = sequelize.define(
  "horario",
  {
    idHorario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idEstilista: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dia: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaFinal: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    estadoHorario: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
      allowNull: false,
    },
  },
  {
    tableName: "horario",
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

Horario.belongsTo(Estilista, { foreignKey: 'idEstilista' });
// Exporta el modelo para usarlo en otros archivos
module.exports = Horario;
