'use strict';

var auditShrinkwrap = require('../lib/audit-shrinkwrap');

module.exports = {
  GET: function (request, reply) {
    var uri = request.params.uri;
    auditShrinkwrap(uri).then(function (results) {
      reply.view('results', {
        repo: uri,
        results: results
      });
    });
  }
};
