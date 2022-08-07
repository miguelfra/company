const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const {verifyToken} = require('../middlewares/authJwt');

router.get('/', verifyToken, productsController.getProducts);
router.get('/:id', verifyToken, productsController.getProductById);
router.post('/', verifyToken, productsController.createProduct);
router.put('/:id', verifyToken, productsController.UpdateProductById);
router.delete('/:id', verifyToken, productsController.DeleteProductById);

module.exports = router;