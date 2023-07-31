const express = require('express');

const PORT = 5000;

const app = express();
const productRoutes = require('./routes');

const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://ian:aaaa1234!@cluster1.dqoal08.mongodb.net/tdd-app?retryWrites=true&w=majority',
    {
        useNewUrlParser: true
    }).then(() => console.log('MongoDb Connected...'))
    .catch(err => console.log(err));

app.use('/api/products', productRoutes);
// app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);
