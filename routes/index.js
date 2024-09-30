// Importamos la libreria
const express = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRoute');
const rolRouter  = require('./rolRouter');
const chatRouter = require('./chatRoutes') 
const authenticateToken = require('../middlewares/authMiddleware');
// Creamos la instancia de la aplicacion
const router = express.Router()

// sin token
router.use('/auth', authRouter);
// con token
//router.use(authenticateToken);

router.use('/rol', rolRouter)
router.use('/user', userRouter);
router.use('/chat', chatRouter);

module.exports = router;