const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { crearHorario, editarHorario, listarHorario, eliminarHorario } = require('../controller/horarioController');


// Ruta para crear un nuevo proveedor con validaciones
router.post('/crearHorario', [
    body('nombreProveedor').isString().notEmpty().withMessage('El nombre del proveedor es requerido'),
    body('nitProveedor').notEmpty().withMessage('El NIT es requerido'),
    body('emailProveedor').isEmail().normalizeEmail().withMessage('El email del proveedor no es válido'),
    body('direccionProveedor').isString().notEmpty().withMessage('La dirección del proveedor es requerida'),
    body('celularProveedor').isString().notEmpty().withMessage('El celular del proveedor es requerido'),
], crearHorario);

// Resto de las rutas sin validaciones por brevedad, pero puedes aplicar el mismo enfoque a las demás rutas si lo deseas

// Ruta para obtener todos los proveedores
router.get('/horario', listarHorario);


// Ruta para actualizar un proveedor existente
router.put('/editarHorario/:idHorario', editarHorario);

// Ruta para eliminar un proveedor
router.delete('/eliminarHorario/:idHorario', eliminarHorario);

module.exports = router;
