const General = require('../models/General');
const express = require('express');
const { getAll, insertChat, askChat } = require("../controllers/chat");
const router = express.Router();

router.post('/chat', askChat);


module.exports = router;
