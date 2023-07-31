const express = require('express');

const PORT = 5000;

const app = express();
const productRoutes = require('./routes');

app.use('/api/products', productRoutes);
// app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);
