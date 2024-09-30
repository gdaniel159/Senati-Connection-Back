const express = require('express');
const {
    getRoles,
    getRolById,
    storeRol,
    updateRol,
    deleteRol
} = require('../controllers/rolController');

const router = express.Router();

router
    .route('/')
    .get(getRoles)          
    .post(storeRol);        

router
    .route('/:id')
    .get(getRolById)        
    .put(updateRol)         
    .delete(deleteRol);     


module.exports = router;