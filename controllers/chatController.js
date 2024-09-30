// Importar `sequelize` desde `models`
const { sequelize } = require('../models');

// Función para ejecutar la consulta SQL directa
const getChats = async (req, res) => {
  try {
    // Definir la consulta SQL
    const query = `
   SELECT 
        /* b.id as idBlock,*/
        c.id as idCourse,
       /* b.description as block,*/
        c.description as course,
        c.initials as initials,
        COALESCE(
        (SELECT COALESCE(CONCAT(u2.firstName, ': ', rd.message), '')  
         FROM recorddet rd 
         INNER JOIN usuarios u2 ON (rd.idUser = u2.id)
         WHERE rd.idRecordCab = rc.id 
         ORDER BY rd.createdAt DESC  
         LIMIT 1), '')  as 'lastMessage'
      FROM assignment a 
      LEFT JOIN blocks b ON (a.idBlock = b.id)
      LEFT JOIN courseblock cb ON (b.id = cb.idBlock)
      LEFT JOIN courses c ON (cb.idCourse = c.id)
      LEFT JOIN recordcab rc ON (c.id = rc.idCourse);

    `;

    // Ejecutar la consulta
    const [results, metadata] = await sequelize.query(query);

    // Enviar la respuesta
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los chats', error });
  }
};

module.exports = {
  getChats
};
