'use strict';

var nspShrinkwrap = require('nsp-audit-shrinkwrap');
var Promise = require('promise');
var Wreck = require('wreck');

module.exports = function (shrinkwrapUri) {
  return new Promise(function (resolve, reject) {
    Wreck.get(shrinkwrapUri, function (err, res, payload) {
      if (err) {
        return reject(err);
      }
      nspShrinkwrap.audit(payload, function (err, results) {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  });
};
