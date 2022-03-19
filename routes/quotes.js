const express = require('express');
const router = express.Router();

const quoteController = require('../controllers/quote');

//GET /quotes/posts
router.get('/quote', quoteController.getQuote);

router.post('/new', quoteController.createQuote);

router.get('/estimate', quoteController.getEstimate);


module.exports = router;