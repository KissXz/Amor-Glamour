const conexion = require('../sequelize');
const { validationResult } = require('express-validator');
const Estilista = require('../model/estilistaModel')

const estilistas = {};

// Obtener todos los estilistas
estilistas.listarEstilista = (req, res) => {
  Estilista.findAll()
    .then(estilistas => { // Cambiado 'Estilista' a 'estilistas'
      console.log('estilistas:', estilistas); // Cambiado 'Estilistaea' a 'estilistas'
      res.status(200).json(estilistas); // Agregado para enviar la respuesta al cliente
    })
    .catch(err => {
      console.error('Error al obtener estilistas:', err);
      res.status(500).send('Error interno del servidor'); // Manejo del error
    });
};



estilistas.crearEstilista = async (req, res) => {
  try {
    const { tipoIdentificacionEstilista, numIdentificacionEstilista, nombreEstilista, apellidoEstilista, fechaNacimientoEstilista, emailEstilista, direccionEstilista, celularEstilista } = req.body;
    const nuevoEstilista = await Estilista.create({
      
      tipoIdentificacionEstilista,
      numIdentificacionEstilista,
      nombreEstilista,
      apellidoEstilista,
      fechaNacimientoEstilista,
      emailEstilista,
      direccionEstilista,
      celularEstilista
    });
    res.status(201).json({ message: 'Estilista creado exitosamente', estilista: nuevoEstilista });
  } catch (error) {
    console.error('Error al crear el Estilista:', error);
    res.status(500).json({ error: 'Error al crear el Estilista en la base de datos' });
  }
};

// editar un Estilista
estilistas.editarEstilista = async (req, res) => {
  const { idEstilista } = req.params; // El ID del Estilista que deseas actualizar
  const { tipoIdentificacionEstilista, numIdentificacionEstilista, nombreEstilista, apellidoEstilista, fechaNacimientoEstilista, emailEstilista, direccionEstilista, celularEstilista } = req.body; // Los nuevos datos del Estilista

  try {
    // Busca el Estilista por su ID
    const estilista = await Estilista.findByPk(idEstilista);

    // Si el Estilista no existe, devuelve un error
    if (!estilista) {
      return res.status(404).json({ message: 'Estilista no encontrado' });
    }

    // Actualiza los datos del Estilista
    estilista.tipoIdentificacionEstilista = tipoIdentificacionEstilista;
    estilista.numIdentificacionEstilista = numIdentificacionEstilista;
    estilista.nombreEstilista = nombreEstilista;
    estilista.apellidoEstilista = apellidoEstilista;
    estilista.emailEstilista = emailEstilista;
    estilista.direccionEstilista = direccionEstilista;
    estilista.celularEstilista = celularEstilista;

    // Guarda los cambios en la base de datos
    await estilista.save();

    // Devuelve una respuesta exitosa
    return res.status(200).json({ mensaje: 'Estilista actualizado correctamente' });
  } catch (error) {
    // Si hay un error, devuelve un mensaje de error
    console.error('Error al actualizar el Estilista:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un Estilista
estilistas.eliminarEstilista = async (req, res) => {
  const { idEstilista } = req.params; // El ID del Estilista que deseas eliminar

  try {
    // Busca el Estilista por su ID
    const estilista = await Estilista.findByPk(idEstilista);

    // Si el Estilista no existe, devuelve un error
    if (!estilista) {
      return res.status(404).json({ error: 'Estilista no encontrado' });
    }

    // Elimina el Estilista de la base de datos
    await estilista.destroy();

    // Devuelve una respuesta exitosa
    return res.status(200).json({ mensaje: 'Estilista eliminado correctamente' });
  } catch (error) {
    // Si hay un error, devuelve un mensaje de error
    console.error('Error al eliminar el Estilista:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = estilistas;
