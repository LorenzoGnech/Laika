const request  = require('supertest');
const jwt      = require('jsonwebtoken');
const app      = require('../app');
const mongoose = require('mongoose');


let server, agent, connection;

beforeAll( async () =>
{
    jest.setTimeout(12000);
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
        if (err) {
            return done(err);  
        } 
        

        
        agent = request.agent(server);
        done();
    });
});

afterEach( (done) => { return  server && server.close(done); });



describe('GET methods for missions', () =>
{
    test('GET /api/v1/missions', async () =>
    {
        const response = await agent.get('/api/v1/missions');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});


describe('Unsafe methods for missions', () => 
{
    let adminToken = jwt.sign(
        {email: 'mock@email.dumb', is_admin: true},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: 100000000000}
    );

    let nonAdminToken = jwt.sign(
        {email: 'mock@email.dumb', is_admin: false},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: 100000000000}
    );

    // TESTS: if user is logged in, if user is admin, if request has correct form
    describe('POST methods for missions', () => 
    {
        test('POST /api/v1/missions without a logged user', async () =>
        {
            const response = await agent
                .post('/api/v1/missions')
                .set('Accept', 'application/json')
                .send({ stuff: 'whatever' });
            
            expect(response.status).toBe(401);
            expect(response.body).toStrictEqual({ error: 'No token provided.' });
        });

        test('POST /api/v1/missions with a non-admin user', async () =>
        {
            let mission = { name: "SpaceGnome", errori: "di scrittura" };

            const response = await agent
                .post('/api/v1/missions')
                .set('Accept', 'application/json')
                .set('x-access-token', nonAdminToken)
                .send(mission);

            expect(response.status).toBe(403);
            expect(response.body).toStrictEqual({ error: 'User is not admin.' });
        });

        test('POST /api/v1/missions with incorrect mission', async () =>
        {
            let mission = { name: "SpaceGnome", errori: "di scrittura" };

            const response = await agent
                .post('/api/v1/missions')
                .set('Accept', 'application/json')
                .set('x-access-token', adminToken)
                .send(mission);

            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({ error: 'Object sent is not a mission.' });
        });
    });

    // TESTS: if user is logged in, if user is admin, if request has correct form,
    // if request denied because file does not exist
    describe('PUT method for missions', () =>
    {
        test('PUT /api/v1/missions without a logged user', async () =>
        {
            const response = await agent
                .put('/api/v1/missions')
                .set('Accept', 'application/json')
                .send({ stuff: 'whatever' });
            
            expect(response.status).toBe(401);
            expect(response.body).toStrictEqual({ error: 'No token provided.' });
        });

        test('PUT /api/v1/missions with a non-admin user', async () =>
        {
            let mission = { name: "SpaceGnome", errori: "di scrittura" };

            const response = await agent
                .put('/api/v1/missions')
                .set('Accept', 'application/json')
                .set('x-access-token', nonAdminToken)
                .send(mission);

            expect(response.status).toBe(403);
            expect(response.body).toStrictEqual({ error: 'User is not admin.' });
        });
        
        test('PUT /api/v1/missions with incorrect mission', async () =>
        {
            const response = await agent
                .put('/api/v1/missions/13')
                .set('Accept', 'application/json')
                .set('x-access-token', adminToken)
                .send({ name: "gianni", errori: "di scrittura" });

            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({ error: 'Object sent is not a mission.' });
        });

        let mission = {
            "date": "1967-03-12T00:00:00.000Z",
            "title": "Mario Rossi",
            "description": "Ita",
            "img_path": "file.jpg",
            "source_url": "ESA",
            "tags": "nice,boy"
        }

        test('PUT /api/v1/missions but the mission does not exists', async () =>
        {
            const response = await agent
                .put('/api/v1/missions/0')
                .set('Accept', 'application/json')
                .set('x-access-token', adminToken)
                .send(mission);

            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({ error: 'Object passed has incorrect values.' });
        });
    });

    // TESTS: if user is logged in, if user is admin, if request denied because file does not exist
    describe('DELETE method for missions', () =>
    {
        test('DELETE /api/v1/missions without a logged user', async () =>
        {
            const response = await agent
                .delete('/api/v1/missions')
                .set('Accept', 'application/json')
                .send({ stuff: 'whatever' });
            
            expect(response.status).toBe(401);
            expect(response.body).toStrictEqual({ error: 'No token provided.' });
        });

        test('DELETE /api/v1/missions with a non-admin user', async () =>
        {
            const response = await agent
                .delete('/api/v1/missions')
                .set('Accept', 'application/json')
                .set('x-access-token', nonAdminToken)
                .send({ stuff: 'whatever' });

            expect(response.status).toBe(403);
            expect(response.body).toStrictEqual({ error: 'User is not admin.' });
        });

        test('DELETE /api/v1/missions but the mission does not exists', async () =>
        {
            const response = await agent
                .delete('/api/v1/missions/0')
                .set('x-access-token', adminToken);

            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({ error: 'Object passed has incorrect values.' });
        });
    });
});