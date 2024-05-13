require("../sequelize");
const Cliente = require("../model/clienteModel");
const { validationResult } = require("express-validator");

const clientes = {};

// Obtener todos los Clientes
clientes.listarCliente = (req, res) => {
  Cliente.findAll()
    .then((clientes) => {
      console.log("Clientes:", clientes);
      res.status(200).json(clientes); // Agregado para enviar la respuesta al cliente
    })
    .catch((err) => {
      console.error("Error al obtener clientes:", err);
      res.status(500).send("Error interno del servidor"); // Manejo del error
    });
};

clientes.crearCliente = (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ mensaje: error.array() });
  }

  const {
    tipoIdentificacionCliente,
    numIdentificacionCliente,
    nombreCliente,
    apellidoCliente,
    fechaNacimientoCliente,
    emailCliente,
    direccionCliente,
    celularCliente,
  } = req.body;
  Cliente.create({
    tipoIdentificacionCliente,
    numIdentificacionCliente,
    nombreCliente,
    apellidoCliente,
    fechaNacimientoCliente,
    emailCliente,
    direccionCliente,
    celularCliente,
  })
    .then((cliente) => {
      res.status(201).json({
        message: "Cliente creado exitosamente",
        cliente: cliente.toJSON(),
      });
    })
    .catch((error) => {
      if (error.name == "SequelizeUniqueConstraintError") {
        res.json({mensaje: "El cliente ya existe"});
      } else {
        console.error("Error al crear el Cliente:", error);
        res
          .status(500)
          .json({ error: "Error al crear el Cliente en la base de datos" });
      }
    });
};

// editar un Cliente
clientes.editarCliente = async (req, res) => {
  const { idCliente } = req.params; // El ID del Cliente que deseas actualizar
  const {
    tipoIdentificacionCliente,
    numIdentificacionCliente,
    nombreCliente,
    apellidoCliente,
    fechaNacimientoCliente,
    emailCliente,
    direccionCliente,
    celularCliente,
  } = req.body; // Los nuevos datos del Cliente

  try {
    // Busca el Cliente por su ID
    const cliente = await Cliente.findByPk(idCliente);

    // Si el Cliente no existe, devuelve un error
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Actualiza los datos del Cliente
    cliente.tipoIdentificacionCliente = tipoIdentificacionCliente;
    cliente.numIdentificacionCliente = numIdentificacionCliente;
    cliente.nombreCliente = nombreCliente;
    cliente.apellidoCliente = apellidoCliente;
    cliente.fechaNacimientoCliente = fechaNacimientoCliente;
    cliente.emailCliente = emailCliente;
    cliente.direccionCliente = direccionCliente;
    cliente.celularCliente = celularCliente;

    // Guarda los cambios en la base de datos
    await cliente.save();

    // Devuelve una respuesta exitosa
    return res
      .status(200)
      .json({ mensaje: "Cliente actualizado correctamente" });
  } catch (error) {
    // Si hay un error, devuelve un mensaje de error
    console.error("Error al actualizar el cliente:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar un Cliente
clientes.eliminarCliente = async (req, res) => {
  const { idCliente } = req.params; // El ID del Cliente que deseas eliminar

  try {
    // Busca el Cliente por su ID
    const cliente = await Cliente.findByPk(idCliente);

    // Si el Cliente no existe, devuelve un error
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // Elimina el Cliente de la base de datos
    await cliente.destroy();

    // Devuelve una respuesta exitosa
    return res.status(200).json({ mensaje: "Cliente eliminado correctamente" });
  } catch (error) {
    // Si hay un error, devuelve un mensaje de error
    console.error("Error al eliminar el cliente:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = clientes;
