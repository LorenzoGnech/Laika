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


module.exports = router;