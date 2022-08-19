const DB = require('../database');
const jwt = require('jsonwebtoken');
const productsController = {
 
    createProduct: async (req, res) => {
        const {name, category, price} = req.body;
        const token = req.headers['x-access-token'];
        const {id} = jwt.verify(token, 'products-api');
        await DB.query(`INSERT INTO products(id_usuario,name, category, price) VALUES (${id}, '${name}', '${category}', ${price})`, (err) => {
            if (!err) {
                res.json({
                    Message: 'Article Saved',
                });
            } else { 
               res.json(err)
            }
        })
        
    },

    getProducts: async (req, res) => {
        const token = req.headers['x-access-token'];
        const {id} = jwt.verify(token, 'products-api');
       await DB.query(`SELECT * FROM products WHERE id_usuario = ${id}`, (err, rows) => {
          if (!err) {
            res.json(rows)
          } else {
            res.json(err);
          }
       })
    },

    getProductById: async (req, res) => {
        const token = req.headers['x-access-token'];
        const {id} = jwt.verify(token, 'products-api');
        await DB.query(`SELECT * FROM products WHERE id = ${req.params.id}`, (err, row) => {
           try {
            if (row[0].id_usuario == id) res.status(200).json(row[0])
           } catch (error) {
             return res.status(404).json({message: 'Product not Found'});
           }
         }) 
    },

    UpdateProductById: async (req, res) => {
        const {id} = req.params; 
        const {name, category, price} = req.body;
        await DB.query(`UPDATE products SET name = '${name}', category = '${category}', price = ${price} WHERE id = ${id}`, (err) => {
            if (!err) {
                res.status(204).json('article Updated')
            } else {
                res.json(err);
            }
        })
    },

    DeleteProductById: async (req, res) => {
        const {id} = req.params; 
        await DB.query(`DELETE  FROM products WHERE id = ${id}`, (err) => {
            if (!err) {
                res.json('Article DELETED')
            } else {
                console.log(err);
            }
        });
    }
}


module.exports = productsController