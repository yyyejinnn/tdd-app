const productController = require('../.././controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const allProducts = require('../data/all-products.json');

// 2-2-3. model에 의존하지 않기 위해 mock 함수 생성
// !! 참고: mock 데이터에 의존하는 부분은 무조건 성공이라고 가정하게 됨
productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.findByIdAndDelete = jest.fn();

const productId = '123456';
const updatedProduct = { name: "updated name", description: "updated description" };
const deletedProduct = { name: "deleted name", description: "it is deleted" };
let req, res, next;

// 2-4-1. beforeEach 생성
beforeEach(() => {
    // 2-3. req.body로 받아온 값을 create 함
    // 2-3-1. reqest, response mock 데이터 생성
    // 2-3-2. 원하는 데이터 값을 담은 json 파일 생성 후 req.body mock 데이터로 사용
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('Product Controller Create', () => {
    // 2-4-2. beforeEach 생성 (사용 범위에 맞게 scope 설정)
    beforeEach(() => {
        req.body = newProduct;
    });

    it('should have a createProcduct function', () => {
        expect(typeof productController.createProduct).toBe('function');     // 섹션 2-1-1. 해당 함수가 실제로 존재하는지 확인
    });

    it('should call ProductModel.create', async () => {
        await productController.createProduct(req, res, next);              // 2-2-1. createProduct() 함수 호출될 때
        expect(productModel.create).toBeCalledWith(newProduct);       // 2-2-2. 해당 model의 create 함수도 호출되는지 확인
    });

    it('should return 201 response code', async () => {               // 2-5. async-await
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        productModel.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "description property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('Product Controller Get', () => {
    it('should have a getProducts function', () => {
        expect(typeof productController.getProduct).toBe('function');
    })

    it('should call ProductModel.find({})', async () => {
        await productController.getProduct(req, res, next);
        expect(productModel.find).toHaveBeenCalledWith({});
    });

    it('should return 200 response code', async () => {
        await productController.getProduct(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        productModel.find.mockReturnValue(allProducts);
        await productController.getProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProducts);
    });


    it("should handle errors", async () => {
        const errorMessage = { message: "error finding product data" };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.find.mockReturnValue(rejectedPromise);
        await productController.getProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
})


describe('Product Controller GetById', () => {
    it('should have a getProductById function', () => {
        expect(typeof productController.getProductById).toBe('function');
    })

    it('should call ProductModel.findById()', async () => {
        req.params.productId = productId;
        await productController.getProductById(req, res, next);
        expect(productModel.findById).toBeCalledWith(productId);
    });

    it('should return json body and 200 response code', async () => {
        productModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return 404 when item doesnt exist', async () => {
        productModel.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "error finding product data by productId" };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.findById.mockReturnValue(rejectedPromise);
        await productController.getProductById(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
})

describe('Product Controller Update', () => {
    it('should have a updateProduct function', () => {
        expect(typeof productController.updateProduct).toBe('function');
    })

    it('should call ProductModel.updateProduct()', async () => {
        req.params.productId = productId;
        req.body = updatedProduct;

        await productController.updateProduct(req, res, next);
        expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
            productId,
            updatedProduct,
            { new: true }
        );
    });

    it('should return json body and 200 response code', async () => {
        req.params.productId = productId;
        req.body = updatedProduct;

        productModel.findByIdAndUpdate.mockReturnValue(updatedProduct);
        await productController.updateProduct(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(updatedProduct);
    });

    it('should return 404 when item doesnt exist', async () => {
        productModel.findByIdAndUpdate.mockReturnValue(null);
        await productController.updateProduct(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "error" };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await productController.updateProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
})

describe('Product Controller Delete', () => {
    it('should have a deleteProduct function', () => {
        expect(typeof productController.deleteProduct).toBe('function');
    })

    it('should call ProductModel.findByIdAndDelete()', async () => {
        req.params.productId = productId;
        await productController.deleteProduct(req, res, next);
        expect(productModel.findByIdAndDelete).toHaveBeenCalledWith(productId);
    });

    it('should return 204 response code', async () => {
        req.params.productId = productId;
        productModel.findByIdAndDelete.mockReturnValue(deletedProduct);
        await productController.deleteProduct(req, res, next);
        expect(res.statusCode).toBe(204);
        expect(res._isEndCalled()).toBeTruthy();
    });
    
    it('should return 404 when item doesnt exist', async () => {
        productModel.findByIdAndDelete.mockReturnValue(null);
        await productController.deleteProduct(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "error" };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await productController.deleteProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
})


// describe('Calculation', () => {
//     test('two plus tow is four', () => {
//         expect(2 + 2).toBe(4);
//     })

//     test('two plus tow is not five', () => {
//         expect(2 + 2).not.toBe(5);
//     })
// })