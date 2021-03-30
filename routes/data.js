const express = require('express');

const controller = require('../controllers/dataGenerator');

const router = express.Router();
//http://localhost:5000/data
router.post('/', controller.getData);

module.exports = router;
