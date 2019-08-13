// /crfc-fb-server.js //

'use strict';

require('dotenv').config();

const express = require('express'),
      bodyParser = require('body-parser');

// required middlewares
var server = express().use(bodyParser.json()); // creates express http server

// Routes
server.use('/app/chatbot', require('messenger-chatbot'));
server.use('/app/emplois', require('tab-emplois'));
server.get('/', function(req, res) {
  console.log('test crfc-fb-server.js');
});

server.listen(process.env.PORT || 1337, () => console.log('Server is listening'));
