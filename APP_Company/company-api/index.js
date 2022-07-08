const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const user = require('./routes/user');
const auth = require('./routes/auth');
const products = require('./routes/products');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000)

//Midlewares
app.use(morgan('dev'));
app.use(express.json()); 
app.use(cors());
//Routes
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/products', products)


app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'), '..');
});