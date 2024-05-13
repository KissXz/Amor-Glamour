const conexion = require('../sequelize');
const Estilista = require('../model/estilistaModel');
const { validationResult } = require('express-validator');
const Horario = require('../model/horarioModel')

const horarios = {};

// Obtener todos los horarios
horarios.listarHorario = (req, res) => {
  Horario.findAll({
    include: {
      model: Estilista,
      attributes: ['nombreEstilista'],
    }
  })
    .then(horarios => { 
      console.log('horarios:', horarios); 
      res.status(200).json(horarios); // Agregado para enviar la respuesta al cliente
    })
    .catch(err => {
      console.error('Error al obtener horarios:', err);
      res.status(500).send('Error interno del servidor'); // Manejo del error
    });
};



horarios.crearHorario = async (req, res) => {
  try {
    const { idEstilista, dia, horaInicio, horaFinal } = req.body;
    const estadoHorario = "Activo";
    const nuevoHorario = await Horario.create({
      idEstilista,
      dia,
      horaInicio,
      horaFinal,
      estadoHorario
    });
    res.status(201).json({ message: 'Horario creado exitosamente', horario: nuevoHorario });
  } catch (error) {
    console.error('Error al crear el Horario:', error);
    res.status(500).json({ error: 'Error al crear el Horario en la base de datos' });
  }
};

// editar un Horario
horarios.editarHorario = async (req, res) => {
  const { idHorario } = req.params; // El ID del Horario que deseas actualizar
  const { dia, horaInicio, horaFinal, estadoHorario } = req.body; // Los nuevos datos del Horario

  try {
    // Busca el Horario por su ID
    const horario = await Horario.findByPk(idHorario);

    // Si el Horario no existe, devuelve un error
    if (!horario) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }
    // Actualiza los datos del Horario
    horario.dia = dia;
    horario.horaInicio = horaInicio;
    horario.horaFinal = horaFinal;
    horario.estadoHorario = estadoHorario;

    // Guarda los cambios en la base de datos
    await horario.save();

    // Devuelve una respuesta exitosa
    return res.status(200).json({ mensaje: 'Horario actualizado correctamente' });
  } catch (error) {
    // Si hay un error, devuelve un mensaje de error
    console.error('Error al actualizar el Horario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un Horario
horarios.eliminarHorario = async (req, res) => {
  const { idHorario } = req.params; // El ID del Horario que deseas eliminar

  try {
    // Busca el Horario por su ID
    const horario = await Horario.findByPk(idHorario);

    // Si el Horario no existe, devuelve un error
    if (!horario) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }

    // Elimina el Horario de la base de datos
    await horario.destroy();

    // Devuelve una respuesta exitosa
    return res.status(200).json({ mensaje: 'Horario eliminado correctamente' });
  } catch (error) {
    // Si hay un error, devuelve un mensaje de error
    console.error('Error al eliminar el Horario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = horarios;
