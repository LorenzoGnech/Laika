const app = require('../app');
const request  = require('supertest');

describe('GET methods for astronauts', () =>
{
    test('GET /api/v1/astronauts', async () => {
        const response = await request(app).get('/api/v1/astronauts');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe('POST methods for astronauts', () => 
{
    const errMsg = { error: 'object sent is not an astronaut' };

    // Id non specificato
    test('POST /api/v1/astronauts with id not specified', () => {
        return request(app)
            .post('/api/v1/astronauts')
            .set('Accept', 'application/json')
            .expect(400, errMsg);
    });

    // Birth non specificato
    test('POST /api/v1/astronauts with birth not specified', () => {
        return request(app)
            .post('/api/v1/astronauts')
            .set('Accept', 'application/json')
            .send({ id: 1010 })
            .expect(400, errMsg);
    });

    // Name non specificato
    test('POST /api/v1/astronauts with name not specified', () => {
        return request(app)
            .post('/api/v1/astronauts')
            .set('Accept', 'application/json')
            .send({ id: 1010, birth: "01/01/1900" })
            .expect(400, errMsg);
    });

    // Nationality non specificato
    test('POST /api/v1/astronauts with nationality not specified', () => {
        return request(app)
            .post('/api/v1/astronauts')
            .set('Accept', 'application/json')
            .send({ id: 1010, birth: "01/01/1900", name: "Mario Rossi" })
            .expect(400, errMsg);
    });

    // Img non specificato
    test('POST /api/v1/astronauts with img not specified', () => {
        return request(app)
            .post('/api/v1/astronauts')
            .set('Accept', 'application/json')
            .send({ id: 1010, birth: "01/01/1900", name: "Mario Rossi", nationality: "ita"})
            .expect(400, errMsg);
    });

    // Agency non specificato
    test('POST /api/v1/astronauts with agency not specified', () => {
        return request(app)
            .post('/api/v1/astronauts')
            .set('Accept', 'application/json')
            .send({ id: 1010, birth: "01/01/1900", name: "Mario Rossi", nationality: "ita", img: ""})
            .expect(400, errMsg);
    });

    // Tests for incorrect number of properties is not needed, since strange properties are automatically discarded.
});