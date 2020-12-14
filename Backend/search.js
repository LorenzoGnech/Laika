const express = require('express');
const router = express.Router();

router.get('/:query', async (req, res) => {
    var query = req.params.query
    query = query.split("+")
    
    res.status(200).send(query);
});

module.exports = router;