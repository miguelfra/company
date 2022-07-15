const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b491eac1e5eca5',
    password: 'ba80fb56',
    database: 'heroku_1a28cdeef4902e1'
});

mysqlConnection.connect( (err) => {
if (!err) {
    console.log('DB is connected');
} else {
    console.log(err);
}
})

module.exports = mysqlConnection;