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
    // Id non specificato
    test('POST /api/v1/astronauts with id not specified', () => {
        return request(app)
            .post('/api/v1/astronauts')
            .set('Accept', 'application/json')
            .expect(400, { error: 'id not specified' });
    });

    // Birth non specificato
    test('POST /api/v1/astronauts with birth not specified', () => {
        return request(app)
            .post('/api/v1/astronauts')
            .set('Accept', 'application/json')
            .send({ id: 1010 })
            .expect(400, { error: 'birth not specified' });
    });

    // Name non specificato
    test('POST /api/v1/astronauts with name not specified', () => {
        return request(app)
            .post('/api/v1/astronauts')
            .set('Accept', 'application/json')
            .send({ id: 1010, birth: "01/01/1900" })
            .expect(400, { error: 'name not specified' });
    });

    // Nationality non specificato
    test('POST /api/v1/astronauts with nationality not specified', () => {
        return request(app)
            .post('/api/v1/astronauts')
            .set('Accept', 'application/json')
            .send({ id: 1010, birth: "01/01/1900", name: "Mario Rossi" })
            .expect(400, { error: 'nationality not specified' });
    });

    // Img non specificato
    test('POST /api/v1/astronauts with img not specified', () => {
        return request(app)
            .post('/api/v1/astronauts')
            .set('Accept', 'application/json')
            .send({ id: 1010, birth: "01/01/1900", name: "Mario Rossi", nationality: "ita"})
            .expect(400, { error: 'img not specified' });
    });

    // Agency non specificato
    test('POST /api/v1/astronauts with agency not specified', () => {
        return request(app)
            .post('/api/v1/astronauts')
            .set('Accept', 'application/json')
            .send({ id: 1010, birth: "01/01/1900", name: "Mario Rossi", nationality: "ita", img: ""})
            .expect(400, { error: 'agency not specified' });
    });
});