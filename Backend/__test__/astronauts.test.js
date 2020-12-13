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
    console.log("Database connection closed");
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



describe('GET methods for astronauts', () =>
{
    test('GET /api/v1/astronauts', async () =>
    {
        const response = await agent.get('/api/v1/astronauts');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});


describe('Unsafe methods for astronauts', () => 
{
    let token = jwt.sign(
        {email: 'mock@email.dumb'},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: 100000000000}
    );

    // TESTS: if user is logged in, if request has correct form
    describe('POST methods for astronauts', () => 
    {
        test('POST /api/v1/astronauts without a logged user', async () =>
        {
            const response = await agent
                .post('/api/v1/astronauts')
                .set('Accept', 'application/json')
                .send({ stuff: 'whatever' });
            
            expect(response.status).toBe(401);
            expect(response.body).toStrictEqual({ error: 'No token provided.' });
        });

        test('POST /api/v1/astronauts with incorrect astronaut', async () =>
        {
            let astronaut = { name: "gianni", errori: "di scrittura" };

            const response = await agent
                .post('/api/v1/astronauts')
                .set('Accept', 'application/json')
                .set('x-access-token', token)
                .send(astronaut);

            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({ error: 'Object sent is not an astronaut.' });
        });
    });

    // TESTS: if user is logged in, if request has correct form
    describe('PUT method for astronauts', () =>
    {
        test('PUT /api/v1/astronauts without a logged user', async () =>
        {
            const response = await agent
                .put('/api/v1/astronauts')
                .set('Accept', 'application/json')
                .send({ stuff: 'whatever' });
            
            expect(response.status).toBe(401);
            expect(response.body).toStrictEqual({ error: 'No token provided.' });
        });
        
        test('PUT /api/v1/astronauts with incorrect astronaut', async () =>
        {
            const response = await agent
                .put('/api/v1/astronauts/13')
                .set('Accept', 'application/json')
                .set('x-access-token', token)
                .send({ name: "gianni", errori: "di scrittura" });

            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({ error: 'Object sent is not an astronaut.' });
        });
    });

    // TESTS: if user is logged in, if request has correct form
    describe('DELETE method for astronauts', () =>
    {
        test('DELETE /api/v1/astronauts without a logged user', async () =>
        {
            const response = await agent
                .delete('/api/v1/astronauts')
                .set('Accept', 'application/json')
                .send({ stuff: 'whatever' });
            
            expect(response.status).toBe(401);
            expect(response.body).toStrictEqual({ error: 'No token provided.' });
        });

        /*test('DELETE /api/v1/astronauts with incorrect astronaut', async () =>
        {
            const response = await agent
                .delete('/api/v1/astronauts')
                .set('Accept', 'application/json')
                .set('x-access-token', token)
                .send({ name: "gianni", errori: "di scrittura" });

            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({ error: 'Object sent is not an astronaut.' });
        }); */
    });
});