// Importamos la libreria
const express = require('express');
const endpoint = require('./routes/index');
const cors = require('cors');
const morgan = require('morgan')
// Creamos la instancia de la aplicacion
const app = express();
// Hanilitar cors
app.use(cors());
app.use(morgan())
// Configurar express para analizas las solicitudes JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Prueba del servidor activo!')
});

app.use('/api', endpoint)

// Configuramos el puerto de ejecucion
const PORT = process.env.PORT || 8080;
// Iniciamos el servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor en funcionamiento en la ruta http://0.0.0.0:${PORT}`);
})
