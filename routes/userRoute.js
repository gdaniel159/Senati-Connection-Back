const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const {
    getUsers,
    getUserById,
    storeUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', authenticateToken, getUsers);
router.get('/:id', authenticateToken, getUserById);
router.post('/', authenticateToken, storeUser);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;