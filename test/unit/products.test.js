const productController = require('../.././controller/products');
const productModel = require('../../models/Product');

productModel.create = jest.fn();        // 2-3. model에 의존하지 않기 위해 mock 함수 생성

describe('Product Controller Create', () => {
    it('should have a createProcduct function', () => {
        expect(typeof productController.createProduct).toBe('function');     // 1. 해당 함수가 실제로 존재하는지 확인
    });

    it('should call ProductModel.create', () => {
        productController.createProduct();              // 2-1. createProduct() 함수 호출될 때
        expect(productModel.create).toBeCalled();       // 2-2. 해당 model의 create 함수도 호출되는지 확인
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