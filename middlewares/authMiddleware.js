const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No hay token proporcionado.' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'token', (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido o expirado.' });
    }
    req.user = decodedToken;
    next();
  });
};

module.exports = authenticateToken;