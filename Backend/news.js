const express = require('express');
const router = express.Router();

var newslist = [{
    "id": 1,
    "date": "16/11/2020",
    "title": "NASA’s SpaceX Crew-1 Astronauts Headed to International Space Station",
    "content": "An international crew of astronauts is en route to the International Space Station following a successful launch on the first NASA-certified commercial human spacecraft system in history. ",
    "img": "",
    "source": "https://www.nasa.gov/",
    "tags": ["nasa", "spacex", "iss"] 
}, {
    "id": 2,
    "date": "17/11/2020",
    "title": "NASA’s SpaceX Crew-1 Astronauts Arrive at Space Station",
    "content": " The SpaceX Crew Dragon Resilience successfully docked to the International Space Station at 11 p.m. EST Monday, transporting NASA astronauts Michael Hopkins, Victor Glover, Shannon Walker, and Japan Aerospace Exploration Agency (JAXA) astronaut Soichi Noguchi.",
    "img": "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/potw2046a.jpg",
    "source": "https://www.nasa.gov",
    "tags": ["nasa", "spacex", "iss"]
}, {
    "id": 3,
    "date": "17/11/2020",
    "title": "NASA Highlights Science, New Airlock on Space Station Resupply Mission",
    "content": "NASA will host a media teleconference at 1 p.m. EST Friday, Nov. 20, to discuss science investigations and a new privately funded airlock launching on SpaceX’s 21st commercial cargo resupply mission for the agency to the International Space Station.",
    "img": "",
    "source": "https://www.nasa.gov",
    "tags": ["nasa"]
}];

router.get('', async (req, res) => {
    res.status(200).json(newslist);
});

router.get('/:id', async (req, res) => {
    var id = req.params.id;
    var news = newslist.find( (p) => p.id == id );
    var n_elements = 3;
    if (news !== undefined){
        res.status(200).send(news);
    } else {
        res.status(404).send('Not found');
    }
});
/*
router.post('', async (req, res) => {

	let book = new Book({
        title: req.body.title
    });
    
	book = await book.save();
    
    let bookId = book.id;

    console.log('Book saved successfully');

    res.location("/api/v1/books/" + bookId).status(201).send();
});
*/

module.exports = router;