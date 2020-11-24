const express = require('express');
const router = express.Router();

var telescopes = [
            {
                "id": 1,
                "launch_date": "24/04/1990",
                "name": "Hubble Space Telescope",
                "description": "The Hubble Space Telescope (often referred to as HST or Hubble) is a space telescope that was launched into low Earth orbit in 1990 and remains in operation. It was not the first space telescope, but it is one of the largest and most versatile, well known both as a vital research tool and as a public relations boon for astronomy.",
                "img": [],
                "source": "https://www.nasa.gov/mission_pages/hubble/main/index.html",
                "tags": ["nasa", "esa"],
            }, {
                "id": 2,
                "date": "14/09/2013",
                "title": "Hisaki Satellite",
                "content": "Hisaki, also known as the Spectroscopic Planet Observatory for Recognition of Interaction of Atmosphere (SPRINT-A) is a Japanese ultraviolet astronomy satellite operated by the Japan Aerospace Exploration Agency (JAXA). The first mission of the Small Scientific Satellite programme,[2] it was launched in September 2013 on the maiden flight of the Epsilon rocket. ",
                "img": [],
                "source": "https://www.jaxa.jp/projects/sat/sprint_a/",
                "tags": ["jaxa"],
            }
];


router.get('', async (req, res) => {
    res.status(200).json(telescopes);
});

router.get('/:id', async (req, res) => {
    var id = req.params.id;
    var tel = telescopes.find( (p) => p.id == id );
    if (astro !== undefined){
        res.status(200).send(tel);
    } else {
        res.status(404).send('Not found');
    }
});

router.get('/latest/:size', async (req, res) => {
    var size = req.params.size;
    if (size <= telescopes.length){
        res.status(200).send(telescopes.slice(1, size+1));        
    } else {
        res.status(200).send(telescopes);
    }
});

router.post('', async (req, res) => {
    
    var newtelescope = {
        "id": (telescopes.length + 1),
        "date": req.body.date,
        "title": req.body.title,
        "content": req.body.content,
        "img": req.body.img,
        "source": req.body.source,
        "tags": req.body.tags
    }

    telescopes.push(newtelescope)

    console.log('telescope saved successfully');
    res.location("/api/v1/telescopes/").status(201).send('telescope saved successfully');
});

module.exports = router;