const util = require('../utilities');

test('Astronaut is correct', () =>
{
    let astronaut = {
        "birth": "1967-03-12T00:00:00.000Z",
        "name": "Mario Rossi",
        "nationality": "Ita",
        "img_path": ["file.jpg"],
        "agency": "ESA",
        "tags": ["nice", "boy"]
    }

    expect(util.isAstronautCorrect(astronaut)).toBeTruthy();
});

test('Mission is correct', () =>
{
    let mission = {
        "date": "1967-03-12T00:00:00.000Z",
        "title": "Mario Rossi",
        "description": "Ita",
        "img_path": "file.jpg",
        "source_url": "ESA",
        "tags": ["nice", "boy"]
    }

    expect(util.isMissionCorrect(mission)).toBeTruthy();
});

test('Exoplanet is correct', () =>
{
    let exoplanet = {
        "discover_date": "1967-03-12T00:00:00.000Z",
        "name": "Mario Rossi",
        "description": "Ita",
        "img_path": "file.jpg",
        "source_url": "ESA",
        "tags": ["nice", "boy"]
    }

    expect(util.isExoplanetCorrect(exoplanet)).toBeTruthy();
});

test('News is correct', () =>
{
    let news = {
        "date": "1967-03-12T00:00:00.000Z",
        "title": "Mario Rossi",
        "content": "Ita",
        "img_path": "file.jpg",
        "source_url": "ESA",
        "tags": ["nice", "boy"]
    }

    expect(util.isNewsCorrect(news)).toBeTruthy();
});

test('Telescope is correct', () =>
{
    let telescope = {
        "launch_date": "1967-03-12T00:00:00.000Z",
        "name": "Mario Rossi",
        "description": "Ita",
        "img_path": ["file.jpg"],
        "source_url": "ESA",
        "tags": ["nice", "boy"]
    }

    expect(util.isTelescopeCorrect(telescope)).toBeTruthy();
});

test('User is correct', () =>
{
    let user = {
        "email": "newborn",
        "password": "Mario Rossi",
        "is_admin": true
    }

    expect(util.isUserCorrect(user)).toBeTruthy();
});
