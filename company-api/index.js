const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const products = require('./routes/products');

const app = express();

//Settings
const PORT = process.env.PORT || 3000;
//Midlewares 
app.use(morgan('dev'));
app.use(express.json()); 
app.use(cors());
//Routes
app.use('/api/admin', admin)
app.use('/api/auth', auth)
app.use('/api/products', products)
app.get('/', (req, res) => {
    res.send('Welcome to my api')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
