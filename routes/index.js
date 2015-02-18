'use strict';

var controllers = require('../controllers/index');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: controllers.home.GET
  }, {
    method: 'GET',
    path: '/uri/{uri*}',
    handler: controllers.uri.GET
  }, {
    method: 'GET',
    path: '/repo/{repo*}',
    handler: controllers.repo.GET
  }
];
