// Importa la biblioteca dotenv y carga las variables de entorno desde el archivo vortex.env
require('dotenv').config({ path: 'vortex.env' });

// Importa la biblioteca mongoose
const mongoose = require("mongoose");

// URI de conexión a MongoDB obtenida de la variable de entorno MONGODB_URI
const mongoURI = process.env.MONGODB_URI;

// Conecta a la base de datos MongoDB utilizando la URI de conexión
mongoose.connect(mongoURI).then(() => {
    console.log("Connection to MongoDB successful");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Exporta la instancia de mongoose (opcional, dependiendo de cómo quieras usarla en tu aplicación)
module.exports = mongoose;
