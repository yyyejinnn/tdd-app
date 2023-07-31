const productController = require('../.././controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');

// 2-3. model에 의존하지 않기 위해 mock 함수 생성
// !! 참고: mock 데이터에 의존하는 부분은 무조건 성공이라고 가정하게 됨
productModel.create = jest.fn();

let req, res, next;

// 4-1. beforeEach 생성
beforeEach(() => {
    // 3. req.body로 받아온 값을 create 함
    // 3-1. reqest, response mock 데이터 생성
    // 3-2. 원하는 데이터 값을 담은 json 파일 생성 후 req.body mock 데이터로 사용
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe('Product Controller Create', () => {
    // 4-2. beforeEach 생성 (사용 범위에 맞게 scope 설정 )
    beforeEach(() => {
        req.body = newProduct;
    });

    it('should have a createProcduct function', () => {
        expect(typeof productController.createProduct).toBe('function');     // 1. 해당 함수가 실제로 존재하는지 확인
    });

    it('should call ProductModel.create', () => {
        productController.createProduct(req, res, next);              // 2-1. createProduct() 함수 호출될 때
        expect(productModel.create).toBeCalledWith(newProduct);       // 2-2. 해당 model의 create 함수도 호출되는지 확인
    })

    it('should return 201 response code', () => {
        productController.createProduct(req, res, next)
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it('should return json body in response', () => {
        productModel.create.mockReturnValue(newProduct);
        productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    })
});


// describe('Calculation', () => {
//     test('two plus tow is four', () => {
//         expect(2 + 2).toBe(4);
//     })

//     test('two plus tow is not five', () => {
//         expect(2 + 2).not.toBe(5);
//     })
// })