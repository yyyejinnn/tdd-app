const productModel = require('../models/Product');

exports.createProduct = async (req, res, next) => {     // async-await
    try {
        const createdProduct = await productModel.create(req.body);
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);    // 4-2. 비동기 함수에서 발생한 에러를 잡아줌
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const allProducts = await productModel.find({});
        res.status(200).json(allProducts);
    } catch (error) {
        next(error);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.productId);

        if (product == null) {
            res.status(404).send();
        }
        else {
            res.status(200).json(product);
        }
    } catch (error) {
        next(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true }
        );

        if (updatedProduct == null) {
            res.status(404).send();
        }
        else {
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        next(error);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const deleteProduct = await productModel.findByIdAndDelete(req.params.productId);

        if (deleteProduct == null){
            res.status(404).json(deleteProduct);
        }
        else{
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }

}

// exports.hello = (req, res)=> {
//     res.send('안녕하세요');
// };