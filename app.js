// Importamos la libreria
const express = require('express');
// Creamos la instancia de la aplicacion
const app = express();
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Prueba del servidor activo!')
});
// Configuramos el puerto de ejecucion
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en la ruta http://127.0.0.1:${PORT}`);
})