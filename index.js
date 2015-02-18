'use strict';

var path = require('path');

var Hapi = require('hapi');
var NunjucksHapi = require('nunjucks-hapi');

var config = require('./config');
var routes = require('./routes/index');

var viewPath = path.join(__dirname, 'views');
var env = NunjucksHapi.configure(viewPath);
env.addFilter('nodesecurity', function (url) {
  return 'https://nodesecurity.io/advisories/' + url;
});
env.addFilter('npmjs', function(module) {
  return 'https://www.npmjs.com/package/' + module;
});

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
  host: config.get('host'),
  port: parseInt(config.get('port'), 10)
});
server.views({
  engines: {
    html: NunjucksHapi
  },
  path: viewPath
});
server.route(routes);
server.start(function () {
  console.log('Hapi server started at %s', server.info.uri);
});
