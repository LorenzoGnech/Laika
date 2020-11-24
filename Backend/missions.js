const express = require('express');
const router = express.Router();

var missionslist = [
    {
        "id": 1,
        "date": "16/11/2020",
        "title": "CREW-1 MISSION",
        "content": "n Monday, November 16 at 11:01 p.m. EST, 04:01 UTC on November 17, SpaceX’s Dragon autonomously docked with the International Space Station (ISS) after Falcon 9 launched the spacecraft to orbit from historic Launch Complex 39A (LC-39A) at NASA’s Kennedy Space Center in Florida on Sunday, November 15, 2020.",
        "img": "",
        "source": "https://www.spacex.com/updates/crew-1-docks-to-iss/index.html",
        "tags": ["iss", "spacex", "nasa"]
    },
    {
        "id": 2,
        "date": "18/12/2019",
        "title": "Cheops",
        "content": " Characterising exoplanets known to be orbiting around nearby bright stars",
        "img": "",
        "source": "https://www.esa.int/Science_Exploration/Space_Science/Cheops",
        "tags": ["esa", "exoplanets"],
    }
];

router.get('', async (req, res) => {
    res.status(200).json(missionslist);
});

router.get('/:id', async (req,res) => {
    var id = req.params.id;
    var mission = missionslist.find( (p) => p.id == id );
    if (mission !== undefined){
        res.status(200).send(mission)
    }else{
        res.status(404).send('Page not found');
    }
});

router.get('/latest/:size', async (req,res) => {
    var size = req.params.size;
    if (size < missionslist.length){
        res.status(200).send(missionslist.slice(missionslist.length-size, size+1));        
    } else {
        res.status(200).send(missionslist);        
    }
});


router.delete('/delete/:id', async (req,res) => {
    var id = req.params.id;
    console.log("DELETE mission ID="+id);
});

module.exports = router;