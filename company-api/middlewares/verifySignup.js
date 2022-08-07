const DB = require('../database');
const verifySnup = {
    checkDuplicateUser: async (req, res, next) => { 
          await DB.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, async (err, row) => {
            if (row.length > 0) return res.status(401).json({ message: 'email alredy exits' });
            next()
        });             
        }

        
    }

module.exports = verifySnup;