const General = require('../models/General');
const express = require('express');
const { tuneList, fineTune } = require("../controllers/chat");
const router = express.Router();

router.post('/tuneList', tuneList);
router.post('/fineTune', fineTune);

module.exports = router;
