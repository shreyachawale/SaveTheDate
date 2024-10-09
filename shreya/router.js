
const express = require('express');
const router = express.Router();


//imports here

const weddingController = require('./controllers/weddingController');


router.post('/wedding/create');
router.get('/wedding/get-by-id/:id');
router.get('/wedding/get-all');
router.delete('/wedding/delete-by-id/:id');
//Entity - Wedding - End

module.exports = router;
