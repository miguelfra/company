const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const {verifyToken} = require('../middlewares/authJwt');

router.get('/user',verifyToken, adminController.getUser);
router.get('/user/:id',verifyToken, adminController.getUserByID);
router.delete('/userDelete/:id',verifyToken, adminController.deletUser);
router.put('/userRol/:id', verifyToken, adminController.updateRol);


module.exports = router;