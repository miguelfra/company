const DB = require('../database')
const jwt = require('jsonwebtoken');
const adminController = {
    getUser: async (req, res) => {         
     await DB.query('SELECT * FROM users', (err, rows) => {
        res.status(200).json(rows)
     }) 
    },

    getUserByID: async (req, res) => {
        const {id} = req.params;
        await DB.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
            res.json(rows[0])
         }) 
    },

    deletUser: async (req, res) => {
        const {id} = req.params;
        await DB.query('DELETE FROM users WHERE id = ?', [id], (err) => {
            if(!err){ 
                res.status(200).json('User Deleted')
            }
        })
    },

    updateRol: async (req, res) => {
        const {id} = req.params;
        const {rol} = req.body;
        await DB.query(`UPDATE users SET rol = ?  WHERE id = ${id}`, [rol], (err) => {
            if(!err){ 
                res.status(200).json('User UPDATED')
            } else {
                res.json(err)
            }
        })
       console.log(req.body);
    },


}


module.exports = adminController;