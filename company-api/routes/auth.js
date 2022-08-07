const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {checkDuplicateUser} = require('../middlewares/verifySignup')

router.post('/signup',checkDuplicateUser, authController.singnUp);
router.post('/signin', authController.singnIn);

module.exports = router;