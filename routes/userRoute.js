const express = require('express');
const {
    getUsers,
    getUserById,
    storeUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

// Obtener todos los usuarios

router
    .route('/')
    .get(getUsers)
    .post(storeUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;