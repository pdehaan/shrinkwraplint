'use strict';

var getUrl = require('github-url-from-username-repo');

var auditShrinkwrap = require('../lib/audit-shrinkwrap');

function getRawUrl(repo) {
  var ghUrl = getUrl(repo);
  var rawUrl = ghUrl.replace('https://github.com/', 'https://raw.githubusercontent.com/');
  return rawUrl + '/master/npm-shrinkwrap.json';
}

module.exports = {
  GET: function (request, reply) {
    var repo = request.params.repo;
    var gitHubRepo = getRawUrl(repo);
    auditShrinkwrap(gitHubRepo).then(function (results) {
      reply.view('results', {
        repo: gitHubRepo,
        results: results
      });
    });
  }
};
