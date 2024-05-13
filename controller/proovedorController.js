const conexion = require('../sequelize');
const { validationResult } = require('express-validator');
const Proveedor = require('../model/proveedorModel')

const proveedores = {};

// Obtener todos los proveedores
proveedores.listarProveedor = (req, res) => {
  Proveedor.findAll()
    .then(proveedores => { // Cambiado 'Proveedor' a 'proveedores'
      console.log('Proveedores:', proveedores); // Cambiado 'Proveedorea' a 'Proveedores'
      res.status(200).json(proveedores); // Agregado para enviar la respuesta al cliente
    })
    .catch(err => {
      console.error('Error al obtener proveedores:', err);
      res.status(500).send('Error interno del servidor'); // Manejo del error
    });
};



proveedores.crearProveedor = async (req, res) => {
  try {
    const { nombreProveedor, nitProveedor, emailProveedor, direccionProveedor, celularProveedor } = req.body;
    const nuevoProveedor = await Proveedor.create({
      nombreProveedor,
      nitProveedor,
      emailProveedor,
      direccionProveedor,
      celularProveedor
    });
    res.status(201).json({ message: 'Proveedor creado exitosamente', proveedor: nuevoProveedor });
  } catch (error) {
    console.error('Error al crear el proveedor:', error);
    res.status(500).json({ error: 'Error al crear el proveedor en la base de datos' });
  }
};

// editar un proveedor
proveedores.editarProveedor = async (req, res) => {
  const { idProveedor } = req.params; // El ID del proveedor que deseas actualizar
  const { nombreProveedor, nitProveedor, emailProveedor, direccionProveedor, celularProveedor } = req.body; // Los nuevos datos del proveedor

  try {
    // Busca el proveedor por su ID
    const proveedor = await Proveedor.findByPk(idProveedor);

    // Si el proveedor no existe, devuelve un error
    if (!proveedor) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    // Actualiza los datos del proveedor
    proveedor.nombreProveedor = nombreProveedor;
    proveedor.nitProveedor = nitProveedor;
    proveedor.emailProveedor = emailProveedor;
    proveedor.direccionProveedor = direccionProveedor;
    proveedor.celularProveedor = celularProveedor;

    // Guarda los cambios en la base de datos
    await proveedor.save();

    // Devuelve una respuesta exitosa
    return res.status(200).json({ mensaje: 'Proveedor actualizado correctamente' });
  } catch (error) {
    // Si hay un error, devuelve un mensaje de error
    console.error('Error al actualizar el proveedor:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un proveedor
proveedores.eliminarProveedor = async (req, res) => {
  const { idProveedor } = req.params; // El ID del proveedor que deseas eliminar

  try {
    // Busca el proveedor por su ID
    const proveedor = await Proveedor.findByPk(idProveedor);

    // Si el proveedor no existe, devuelve un error
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    // Elimina el proveedor de la base de datos
    await proveedor.destroy();

    // Devuelve una respuesta exitosa
    return res.status(200).json({ mensaje: 'Proveedor eliminado correctamente' });
  } catch (error) {
    // Si hay un error, devuelve un mensaje de error
    console.error('Error al eliminar el proveedor:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = proveedores;
