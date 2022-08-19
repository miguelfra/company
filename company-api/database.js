const mysql = require('mysql');

const database = {
    host: '******t',
    user: '******',
    password: '****',
    database: '******'
}

const mysqlConnection = mysql.createPool(database);




module.exports = mysqlConnection;