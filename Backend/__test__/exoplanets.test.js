const request  = require('supertest');
const jwt      = require('jsonwebtoken');
const app      = require('../app');
const mongoose = require('mongoose');


let server, agent, connection;

beforeAll( async () =>
{
    jest.unmock('mongoose');
    connection = await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Database connected!');
});

afterAll( () =>
{
    mongoose.connection.close(true);
    console.log('Database connection closed');
});

beforeEach( (done) =>
{
    server = app.listen(4000, (err) =>
    {
        if (err) return done(err);
        
        agent = request.agent(server);
        done();
    });
});

afterEach( (done) => { return  server && server.close(done); });



describe('GET methods for exoplanets', () =>
{
    test('GET /api/v1/exoplanets', async () =>
    {
        const response = await agent.get('/api/v1/exoplanets');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});


describe('Unsafe methods for exoplanets', () => 
{
    let token = jwt.sign(
        {email: 'mock@email.dumb'},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: 100000000000}
    );

    // TESTS: if user is logged in, if request has correct form
    describe('POST methods for exoplanets', () => 
    {
        test('POST /api/v1/exoplanets without a logged user', async () =>
        {
            const response = await agent
                .post('/api/v1/exoplanets')
                .set('Accept', 'application/json')
                .send({ stuff: 'whatever' });
            
            expect(response.status).toBe(401);
            expect(response.body).toStrictEqual({ error: 'No token provided.' });
        });

        test('POST /api/v1/exoplanets with incorrect exoplanet', async () =>
        {
            let exoplanet = { name: "Kepler-102930293", errori: "di scrittura" };

            const response = await agent
                .post('/api/v1/exoplanets')
                .set('Accept', 'application/json')
                .set('x-access-token', token)
                .send(exoplanet);

            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({ error: 'Object sent is not an exoplanet.' });
        });
    });

    // TESTS: if user is logged in, if request has correct form, if request denied because file does not exist
    describe('PUT method for exoplanets', () =>
    {
        test('PUT /api/v1/exoplanets without a logged user', async () =>
        {
            const response = await agent
                .put('/api/v1/exoplanets')
                .set('Accept', 'application/json')
                .send({ stuff: 'whatever' });
            
            expect(response.status).toBe(401);
            expect(response.body).toStrictEqual({ error: 'No token provided.' });
        });
        
        test('PUT /api/v1/exoplanets with incorrect exoplanets', async () =>
        {
            const response = await agent
                .put('/api/v1/exoplanets/13')
                .set('Accept', 'application/json')
                .set('x-access-token', token)
                .send({ name: "Kepler-1313", errori: "di scrittura" });

            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({ error: 'Object sent is not an exoplanet.' });
        });

        let exoplanet = {
            "discover_date": "1967-03-12T00:00:00.000Z",
            "name": "Mario Rossi",
            "description": "Ita",
            "img_path": "file.jpg",
            "source_url": "ESA",
            "tags": ["nice", "boy"]
        }

        test('PUT /api/v1/exoplanets but the exoplanet does not exists', async () =>
        {
            const response = await agent
                .put('/api/v1/exoplanets/0')
                .set('Accept', 'application/json')
                .set('x-access-token', token)
                .send(exoplanet);

            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({ error: "Object passed has incorrect values." });
        });
    });

    // TESTS: if user is logged in, if request denied because file does not exist
    describe('DELETE method for exoplanets', () =>
    {
        test('DELETE /api/v1/exoplanets without a logged user', async () =>
        {
            const response = await agent
                .delete('/api/v1/exoplanets')
                .set('Accept', 'application/json')
                .send({ stuff: 'whatever' });
            
            expect(response.status).toBe(401);
            expect(response.body).toStrictEqual({ error: 'No token provided.' });
        });

        test('DELETE /api/v1/exoplanets but the exoplanet does not exists', async () =>
        {
            const response = await agent
                .delete('/api/v1/exoplanets/0')
                .set('x-access-token', token);

            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({ error: 'Object passed has incorrect values.' });
        });
    });
});