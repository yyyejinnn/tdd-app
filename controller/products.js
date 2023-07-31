const productModel = require('../models/Product');

exports.createProduct = async (req, res, next) => {     // async-await
    const createdProduct = await productModel.create(req.body);
    res.status(201).json(createdProduct);
};

// exports.hello = (req, res)=> {
//     res.send('안녕하세요');
// };