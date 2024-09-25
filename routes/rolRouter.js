const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const {
    getRoles,
    getRolById,
    storeRol,
    updateRol,
    deleteRol
} = require('../controllers/rolController');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', authenticateToken, getRoles);
router.get('/:id', authenticateToken, getRolById);
router.post('/', authenticateToken, storeRol);
router.put('/:id', authenticateToken, updateRol);
router.delete('/:id', authenticateToken, deleteRol);

module.exports = router;