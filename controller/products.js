const productModel = require('../models/Product');

exports.createProduct = (req, res, next) => {
    productModel.create(req.body);
};

// exports.hello = (req, res)=> {
//     res.send('안녕하세요');
// };