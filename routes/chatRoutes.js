const express = require('express');
const {
    getChats
} = require('../controllers/chatController');

const router = express.Router();

router
    .route('/')
    .get(getChats)          
 


module.exports = router;