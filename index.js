const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const limitRequest = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  mensaje: "Demasiadas peticiones, Intentalo más tarde",
});
require("./sequelize");
const proveedorRoute = require("./routes/proveedorRoute");
const estilistaRoute = require("./routes/estilistaRoute");
const clienteRoute = require("./routes/clienteRoute");
const horarioRoute = require("./routes/horarioRoute");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(limitRequest);

// Middleware para manejar las rutas relacionadas con los proveedores
app.use(proveedorRoute);
app.use(estilistaRoute);
app.use(clienteRoute);
app.use(horarioRoute);

// Manejador de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send("Ruta no encontrada");
});

// Manejador de errores para otros tipos de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
