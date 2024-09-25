// Importamos la libreria
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRoute');
const rolRouter = require('./routes/rolRouter')
const cors = require('cors');
// Creamos la instancia de la aplicacion
const app = express();
// Hanilitar cors
app.use(cors());
// Configurar bodyParser para analizas las solicitudes JSON
app.use(bodyParser.json());
// Enrutado para el login
app.use('/api/auth', authRouter);
// Enrutado para los usuarios
app.use('/api/user', userRouter);
// Enrutado para los roles
app.use('/api/rol', rolRouter);
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