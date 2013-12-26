/**
 * Remote Gallery
 * (c) Ferimer, servicios informaticos, 2013 - All rights reserved
 * License: GNU Affero V3 (see LICENSE file)
 * Fernando Rodríguez Sela <fernando@ferimer.es>
 */

function getTextFile(filename, callback) {
  var req = new XMLHttpRequest();
  req.onload = function() {
    callback(req.response);
  }
  req.open('get', filename, true);
  req.responseType = 'text';
  req.send();
}
