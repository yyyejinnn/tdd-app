const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

it('POST /api/products', async () => {
    const response = await request(app)
        .post('/api/products')
        .send(newProduct);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.description).toBe(newProduct.description);
});

it('should return 500 on POST /api/products', async () => {
    const response = await request(app)
        .post('/api/products')
        .send({ name: 'Missing description property' });    // error

    expect(response.statusCode).toBe(500);

    /** 섹션 4: Express.js 에러 처리에 대해서
     * 4-1. 다음과 같이 찍어보면 response.body는 빈 객체 {}로 뜬다. 왜??
     *  >> https://app.diagrams.net/#G1oQ9MC88FQeUcOoTXoCWn_4FnkWlD4e5l#%7B%22pageId%22%3A%222lDTYWseXCv_ca6kvTSw%22%7D 참고
     *  - 에러핸들링 하지않고 있기 때문
     */
    // console.log(response.body);

    expect(response.body).toStrictEqual({
        message: "Product validation failed: description: Path `description` is required."
    })
})


it('GET /api/products', async () => {
    const response = await request(app).get('/api/products');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();            // 변수가 undefined인지 아닌지
    expect(response.body[0].description).toBeDefined();
});