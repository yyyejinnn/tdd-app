const productModel = require('../models/Product');

exports.createProduct = async (req, res, next) => {     // async-await
    try {
        const createdProduct = await productModel.create(req.body);
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);    // 4-2. 비동기 함수에서 발생한 에러를 잡아줌
    }
};

// exports.hello = (req, res)=> {
//     res.send('안녕하세요');
// };