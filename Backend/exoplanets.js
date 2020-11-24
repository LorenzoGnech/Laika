const express = require('express');
const router = express.Router();

var exoplanetsList = [
    {
        "id": 1,
        "discovery_date": "21/10/2013",
        "name": "WASP-76b",
        "description": "WASP-76b is a hot Jupiter exoplanet discovered during 2013 that can be found in the constellation Pisces. It orbits a F-type star BD+01 316 (WASP-76) and has a size 0.92 that of Jupiter's mass.",
        "img": "",
        "source": "https://en.wikipedia.org/wiki/WASP-76b",
        "tags": ["nasa"],
    }, {
        "id": 2,
        "date": "15/04/2020",
        "title": "Kepler-1649c",
        "content": "Kepler-1649c is an exoplanet orbiting the M-type main sequence red dwarf star Kepler-1649, about 300 light-years from Earth, nằm trong chòm sao Thiên Nga.",
        "img": "",
        "source": "https://en.wikipedia.org/wiki/Kepler-1649c",
        "tags": ["kepler"],
    }
];

router.get('', async (req, res) => {
    res.status(200).json(exoplanetsList);
});

router.get('/:id', async (req, res) => {
    var id = req.params.id;
    var exoplanet = exoplanetsList.find( (p) => p.id == id );
    if (exoplanet !== undefined){
        res.status(200).send(exoplanet);
    } else {
        res.status(404).send('Not found');
    }
});

router.get('/latest/:size', async (req, res) => {
    var size = req.params.size;
    if (size <= exoplanetsList.length){
        res.status(200).send(exoplanetsList.slice(0, size));
    } else {
        res.status(200).send(exoplanetsList);
    }
});

router.post('', async (req, res) => {
    let newExoplanet = req.body;

    exoplanetsList.push(newExoplanet);

    res.location('/' + newExoplanet.id).status(201).send();
});



module.exports = router;