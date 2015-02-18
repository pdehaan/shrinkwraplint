'use strict';

var fs = require('fs');
var path = require('path');

var convict = require('convict');

// define a schema

var conf = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 5000,
    env: 'PORT'
  }
});

// load environment dependent configuration
var envConfig = path.join(__dirname, 'config', conf.get('env') + '.json');
if (fs.existsSync(envConfig)) {
  conf.loadFile(envConfig);
}

// perform validation
conf.validate();

module.exports = conf;
