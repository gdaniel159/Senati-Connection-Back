const { Rol, Usuario } = require('../models');

// Obtener usuarios

const getUsers = async (req, res) => { 

    try {

        const usuarios = await Usuario.findAll({
            include : [
                {
                    model: Rol,
                    as: 'rol'
                }
            ]
        });

        console.log(usuarios);

        res.status(200).json(usuarios);

    } catch (error) {

        res.status(500).json({message:'Error al obtener los usuarios', error});

    }

}

// Exportar modulos

module.exports = {
    getUsers,
};