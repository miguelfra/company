const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authJwt');

router.post('/', verifyToken ,userController.createUser);

module.exports = router;