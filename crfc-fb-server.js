#!/usr/bin/env node
// /crfc-fb-server.js //

'use strict';

require('dotenv').config();

const express = require('express'),
      bodyParser = require('body-parser'),
      yargs = require('yargs');

// required middlewares
var server = express().use(bodyParser.json()); // creates express http server

function start_server() {
  // Routes
  server.use('/app/chatbot', require('messenger-chatbot'));
  server.use('/app/emplois', require('tab-emplois'));
  server.get('/', function(req, res) {
    console.log('test crfc-fb-server.js');
  });

  // Server listening
  server.listen(process.env.PORT || 1337, () => console.log('Server is listening'));
}

const argv = yargs
  .scriptName("crvfc")
  .command('start [app]', 'Start the designated application', {
    app: {
      description: "path leading to the application, if none, the server will start",
      type: 'string'
    }
  }, (argv) => {
    if (argv.app){
      console.log("starting up the", argv.app);
    } else {
      console.log("starting up the server");
      start_server();
    }
  })
  .command('stop [app]', 'Stop the designated application', {
    app: {
      description: "path leading to the application, if none, the server will stop",
      type: 'string'
    }
  }, (argv) => {
    if (argv.app){
      console.log("shutting down the", argv.app);
    } else {
      console.log("shutting down the server");
      // TODO
    }
  })
  .usage("Usage:")
  .options('verbose', {
    alias: 'v',
    description: 'Verbose the output',
    type: 'boolean'
  })
  .help()
  .alias('help', 'h')
  .locale('fr')
  .argv;

console.log(argv);
