const jwt = require('jsonwebtoken');
const DB = require('../database');

const autJwt = {
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers["x-access-token"];

            if (!token) return res.status(403).json({ message: 'NO TOKEN PROVIDED' })

            const decode = jwt.verify(token, 'products-api');

            await DB.query(`SELECT * FROM users WHERE id = ${decode.id}`, (err, rows) => {
                if (rows.length == 0) return res.status(404).json({ message: 'no user found' })

            })

           next();
        } catch (error) {
            return res.status(401).json({message: 'Unauthorized'});
        }
    },
}

module.exports = autJwt