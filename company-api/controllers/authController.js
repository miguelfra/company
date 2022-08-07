const DB = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authController = {

    singnUp: async (req, res) => {
       try {
        const {username, email, password} = req.body;
        const rol = 'user'
        const passwordHash =  await encryptPassword(password);
        await DB.query(`INSERT INTO users(username, email, password, rol) VALUES('${username}', '${email}', '${passwordHash}', '${rol}')`, (err, row) => {
            if (!err) {
                const token = jwt.sign({id: row.insertId}, 'products-api', {
                    expiresIn: 86400 //24 hours
                })

                res.json({token, rol: rol});
            } else {
                console.log(err); 
            }
             
       });
       } catch (error) {
        res.json(error)
       }
    },

    singnIn: async (req, res) => {
    await DB.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, async (err, rows) => {
        if (rows.length == 0) return res.status(400).json({Message: 'User not Found'}); 

         const matchPassword = await comparePassword(req.body.password, rows[0].password);
         if (!matchPassword) return res.status(401).json({token: null, Message: 'Invalid password'});

         const token = jwt.sign({id: rows[0].id}, 'products-api', {
            expiresIn: 86400
          })       
          res.json({token, rol: rows[0].rol});
   });
        

        
    },
}

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const comparePassword = async (password, DBPassword) => {
    return await bcrypt.compare(password, DBPassword);
}


module.exports = authController;