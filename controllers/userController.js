const { Rol, Usuario } = require('../models');
const bcrypt = require('bcrypt');

// Obtener usuarios

const getUsers = async (req, res) => { 

    try {

        const usuarios = await Usuario.findAll();

        res.status(200).json(usuarios);

    } catch (error) {

        res.status(500).json({message:'Error al obtener los usuarios', error});

    }

}

// Obtener usuario por id

const getUserById = async (req, res) => {

    try {

        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) return res.status(404).json({message: "Usario no encontrado"});

        res.status(200).json(usuario);
        
    } catch (error) {

        res.status(500).json({error:"Error al obtener el usuario"})

    }

}

// Creacion de usuarios

const storeUser = async (req, res) => {

    try {

        const { firstName, lastName, idRol, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const usuario = await Usuario.create({ firstName, lastName, idRol, email, password: hashedPassword });

        res.status(201).json(usuario)

    } catch (error) {

        res.status(500).json({error : "Error al crear usuario", error});

    }

}

// Actualizar usuario

const updateUser = async (req, res) => {

    try {

        const { firstName, lastName, idRol, email, password } = req.body;

        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ message: "No se pudo encontrar al usuario" });

        // console.log("Usuario encontrado => ", usuario);

        const updated = await Usuario.update(
            { firstName, lastName, idRol, email, ...(password && { password: await bcrypt.hash(password, 10) }) },
            { where: { id: req.params.id } }
        );

        // console.log("Usuario actualizado => ", updated);

        if (updated[0]) return res.status(200).json({ message: "Usuario actualizado exitosamente" });

        return res.status(400).json({ message: "No se pudo actualizar el usuario" });

    } catch (error) {

        res.status(500).json({error : "Error al actualizar el usuario", error});

    }

}

// Eliminar usuario

const deleteUser = async (req, res) => {

    try {

        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) return res.status(404).json({ message: "No se pudo encontrar al usuario" });

        await Usuario.destroy({ where: { id: req.params.id } });

        return res.status(200).json({ message: "Usuario eliminado exitosamente" });

    } catch (error) {

        res.status(500).json({error:"Error al eliminar usuario", error});

    }

}

// Exportar modulos

module.exports = {
    getUsers,
    getUserById,
    storeUser,
    updateUser,
    deleteUser
};