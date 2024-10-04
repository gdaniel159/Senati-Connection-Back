// Importamos la librería
const express = require('express');
const http = require('http'); // Asegúrate de importar http
const endpoint = require('./routes/index');
const cors = require('cors');
const { Server } = require('socket.io');

// Creamos la instancia de la aplicación
const app = express();
const server = http.createServer(app); // Crear el servidor HTTP

const io = new Server(server);
const path = require('path');
const cursos = {};

// Habilitar CORS
app.use(cors());

// Configurar express para analizar las solicitudes JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<img src="https://i.makeagif.com/media/7-02-2015/MpUSdO.gif" alt="Estatus Server" title="Llego tu pedido chamo" />');
});

io.on('connection', (socket) => {
    console.log("El usuario se ha conectado");

    // Al recibir el evento `join` con el token y el ID del curso
    socket.on('join', ({ idUser, idCurso }) => {
        console.log(`Cliente con idUser ${idUser} se conectó al curso ${idCurso}`);

        // Verificar si la lista de ese curso ya existe
        if (!cursos[idCurso]) {
            cursos[idCurso] = []; // Crear la lista si no existe
        }

        // Asignar el socket a la lista de ese curso
        cursos[idCurso].push(socket);
        console.log(`Clientes en el curso ${idCurso}: `, cursos[idCurso].length);

        // Emitir un mensaje de bienvenida solo al cliente que se conectó
        socket.emit('welcome', `Bienvenido al curso ${idCurso}`);

        // Configurar un evento de desconexión para eliminar al cliente de la lista
        socket.on('disconnect', () => {
            console.log(`Cliente con idUser ${idUser} se ha desconectado del curso ${idCurso}`);

            // Eliminar el socket del curso correspondiente
            cursos[idCurso] = cursos[idCurso].filter(s => s !== socket);

            // Si la lista está vacía, eliminar el curso del objeto
            if (cursos[idCurso].length === 0) {
                delete cursos[idCurso];
                console.log(`No hay más clientes en el curso ${idCurso}. Lista eliminada.`);
            }
        });
    });
});

// API para enviar mensajes a los clientes conectados en un curso
app.post('/api/chat', (req, res) => {
    let { idCurso, mensaje } = req.body;

    console.log(`Mensaje recibido en el curso ${idCurso}: ${mensaje}`);

    // Verificar si hay clientes en ese curso
    if (cursos[idCurso]) {
        // Emitir el mensaje a todos los clientes conectados a ese curso
        // cursos[idCurso].forEach(clientSocket => {
        //     clientSocket.emit('chat', { idCurso, mensaje });
        // });
        cursos[idCurso].forEach(clientSocket => {
            // Comprobamos si el socket actual no es el del remitente
            if (clientSocket.id !== req.socket.id) {
                clientSocket.emit('chat', { idCurso, mensaje });
            }
        });
        return res.status(200).json({ mensaje: 'Mensaje enviado a los clientes del curso.' });
    } else {
        console.log(`No hay clientes conectados en el curso ${idCurso}`);
        return res.status(404).json({ mensaje: 'No hay clientes conectados en este curso.' });
    }
});

app.get('/websocket', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});
// apis
app.use('/api', endpoint);

// Cargar las variables de entorno
require('dotenv').config();

// Configuramos el puerto de ejecución
const PORT = process.env.PORT || 8080;

// Iniciamos el servidor
server.listen(PORT, '0.0.0.0' () => {
    console.log(`Servidor en funcionamiento en la ruta http://0.0.0.0:${PORT}`);
});
