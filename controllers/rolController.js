const { Rol } = require('../models');

// Obtener roles

const getRoles = async (req, res) => { 

    try {

        const rol = await Rol.findAll();

        res.status(200).json(rol);

    } catch (error) {

        res.status(500).json({message:'Error al obtener los roles', error});

    }

}

// Obtener roles por id

const getRolById = async (req, res) => {

    try {

        const rol = await Rol.findByPk(req.params.id);

        if (!rol) return res.status(404).json({message: "Rol no encontrado"});

        res.status(200).json(rol);
        
    } catch (error) {

        res.status(500).json({error:"Error al obtener el rol"})

    }

}

// Creacion de usuarios

const storeRol = async (req, res) => {

    try {

        const { description } = req.body;

        const rol = await Rol.create({ description });

        console.log(rol);

        res.status(201).json(rol)

    } catch (error) {

        res.status(500).json({error : "Error al crear rol", error});

    }

}

// Actualizar usuario

const updateRol = async (req, res) => {

    try {

        const { description } = req.body;

        const rol = await Rol.findByPk(req.params.id);
        if (!rol) return res.status(404).json({ message: "No se pudo encontrar el rol" });

        const updated = await Rol.update(
            { description },
            { where: { id: req.params.id } }
        );

        if (updated[0]) return res.status(200).json({ message: "Rol actualizado exitosamente" });

        return res.status(400).json({ message: "No se pudo actualizar el rol" });

    } catch (error) {

        res.status(500).json({error : "Error al actualizar el rol", error});

    }

}

// Eliminar usuario

const deleteRol = async (req, res) => {

    try {

        const rol = await Rol.findByPk(req.params.id);

        if (!rol) return res.status(404).json({ message: "No se pudo encontrar el rol" });

        await Rol.destroy({ where: { id: req.params.id } });

        return res.status(200).json({ message: "Rol eliminado exitosamente" });

    } catch (error) {

        res.status(500).json({error:"Error al eliminar rol", error});

    }

}

// Exportar modulos

module.exports = {
    getRoles,
    getRolById,
    storeRol,
    updateRol,
    deleteRol
};