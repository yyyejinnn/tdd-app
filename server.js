const express = require('express');

const PORT = 5000;

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const productRoutes = require('./routes');

const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://ian:aaaa1234!@cluster1.dqoal08.mongodb.net/tdd-app?retryWrites=true&w=majority',
    {
        useNewUrlParser: true
    }).then(() => console.log('MongoDb Connected...'))
    .catch(err => console.log(err));

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

// 4-3. 에러 핸들링
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
})

app.listen(PORT);
console.log(`Running on port ${PORT}`);

module.exports = app;   // 통합 테스트를 위해 exports