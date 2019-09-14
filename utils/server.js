// /utils/server.js //

'use strict';

const express = require('express'),
      bodyParser = require('body-parser');

// required middlewares
var server = express().use(bodyParser.json()); // creates express http server

function start(port) {
  // Routes
  server.use('/app/chatbot', require('messenger-chatbot'));
  server.use('/app/emplois', require('tab-emplois'));
  server.get('/', function(req, res) {
    console.log('test crfc-fb-server.js');
  });

  // Server listening
  server.listen(process.env.PORT || port, () => console.log('Server is listening'));

}

/*process.on('exit', () => {
  console.log('about to close de server');
  server.close();
});

start();*/

module.exports = {
  start
};
