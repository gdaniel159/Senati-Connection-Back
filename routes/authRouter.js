const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Buscar el usuario por correo electrónico en la base de datos
    const usuario = await Usuario.findOne({ where: { email } });

    // Verificar si el usuario existe
    if (!usuario) {
        return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(password, usuario.password);

    if (!contraseñaValida) {
        return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrectos' });
    }

    // Si el correo y la contraseña son válidos, generar el token JWT
    const token = jwt.sign({ usuarioId: usuario.id }, 'token', { expiresIn: '1h' });

    const name = usuario.firstName + ' ' + usuario.lastName;

    // Si el correo y la contraseña son válidos, el usuario se ha autenticado con éxito
    return res.status(200).json({ message: 'Inicio de sesión exitoso', token, name });
});

module.exports = router;