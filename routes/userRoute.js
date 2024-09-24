const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const {
    getUsers,
} = require('../controllers/userController');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', authenticateToken, getUsers);

module.exports = router;