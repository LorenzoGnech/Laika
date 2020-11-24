const express = require('express');
const router = express.Router();

var astronauts = [
    {
        "id": 1,
        "birth": "27/09/1976",
        "name": "Luca Parmitano",
        "nationality": "Italy",
        "img": "",
        "agency": "ESA",
    }, {
        "id": 2,
        "birth": "19/09/1987",
        "name": "Kayla Barron",
        "nationality": "US",
        "img": "",
        "agency": "NASA",
    }
];



router.get('', async (req, res) => {
    res.status(200).json(astronauts);
});

router.get('/:id', async (req, res) => {
    var id = req.params.id;
    var astro = astronauts.find( (p) => p.id == id );
    if (astro !== undefined){
        res.status(200).send(astro);
    } else {
        res.status(404).send('Not found');
    }
});

router.get('/latest/:size', async (req, res) => {
    var size = req.params.size;
    if (size < astronauts.length){
        res.status(200).send(astronauts.slice(astronauts.length-size, size+1));        
    } else {
        res.status(200).send(astronauts);        
    }
});

router.post('', async (req, res) => {
    
    var newastronaut = {
        "id": astronauts.length + 1,
        "birth": req.body.birth,
        "name": req.body.name,
        "nationality": req.body.nationality,
        "img": req.body.img,
        "agency": req.body.agency,
    }

    console.log('Astronaut saved successfully');
    res.location("/api/v1/astronauts/").status(201).send('Astronaut saved successfully');

    astronauts.push(newastronaut);

});

module.exports = router;