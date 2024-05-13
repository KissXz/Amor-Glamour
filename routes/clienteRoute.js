const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { crearCliente, editarCliente, listarCliente, eliminarCliente } = require('../controller/clienteController')


// Ruta para crear un nuevo proveedor con validaciones
router.post('/crearCliente', [
    body('tipoIdentificacionCliente').isString().notEmpty().withMessage('El tipo identificación es requerido'),
    body('numIdentificacionCliente').isInt({min:0}).notEmpty().withMessage('El número de identificación es requerido'),
    body('nombreCliente').isString().notEmpty() .withMessage('El nombre del cliente es requerido'),
    body('apellidoCliente').isString().notEmpty().withMessage('El apellido del cliente es requerido'),
    body('fechaNacimientoCliente').isISO8601().toDate().notEmpty().withMessage('La fecha de nacimiento del cliente es requerida'),
    body('emailCliente').isEmail().normalizeEmail().notEmpty().withMessage('El email del cliente es requerido'),
    body('direccionCliente').isString().notEmpty().withMessage('La dirección del cliente es requerida'),
    body('celularCliente').isString().notEmpty().withMessage('El celular del cliente es requerido'),
], crearCliente);


// Ruta para obtener todos los proveedores
router.get('/cliente', listarCliente);


// Ruta para actualizar un proveedor existente
router.put('/editarCliente/:idCliente', editarCliente);

// Ruta para eliminar un proveedor
router.delete('/eliminarCliente/:idCliente', eliminarCliente);

module.exports = router;
