const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por correo electrónico en la base de datos
        const usuario = await Usuario.scope('withPassword').findOne({ where: { email } });

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const contraseñaValida = await bcrypt.compare(password, usuario.password);

        if (!contraseñaValida) {
            return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrectos' });
        }

	console.log("Usuario: ", usuario);
	console.log("Contraseña Valida: ", contraseñaValida);

	console.log('JWT_SECRET:', process.env.JWT_SECRET);

        // Si el correo y la contraseña son válidos, generar el token JWT
        const token = jwt.sign({ usuarioId: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const name = usuario.firstName + ' ' + usuario.lastName;

        // Responder con el token y el nombre del usuario
        return res.status(200).json({ message: 'Inicio de sesión exitoso', token, name,id:usuario.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Ocurrió un error en el servidor' });
    }
});


module.exports = router;
