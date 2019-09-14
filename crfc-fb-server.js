#!/usr/bin/env node
// /crfc-fb-server.js //

'use strict';

require('dotenv').config();

const yargs = require('yargs'),
      pm2 = require('pm2'),
      server = require('./utils/server');

const argv = yargs
  .scriptName("crfc")
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
      server.start();
      /*
      pm2.connect((err) =>{
        if(err) {
          console.error(err);
          process.exit(2);
        }

        pm2.start({
          script: './utils/server.js',
          name: 'crfc-server',
          exec_mode: 'fork',
          max_memory_restart: '100M',
          watch: true
        }, (err, apps) => {
          console.log('Déconnexion');
          pm2.disconnect();
          if (err) throw err;
        });

      });
      */
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
      pm2.disconnect();
    }
  })
  .usage("Usage: crvfc [action] [options]")
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
