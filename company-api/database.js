const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'companydb'
});

mysqlConnection.connect( (err) => {
if (!err) {
    console.log('DB is connected');
} else {
    console.log(err);
}
})

module.exports = mysqlConnection;