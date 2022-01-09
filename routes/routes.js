const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/hello', (req, res) => {
    res.send('Hello')
})

module.exports = router;