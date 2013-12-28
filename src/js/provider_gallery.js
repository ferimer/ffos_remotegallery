/**
 * Remote Gallery
 * (c) Ferimer, servicios informaticos, 2013 - All rights reserved
 * License: GNU Affero V3 (see LICENSE file)
 * Fernando Rodríguez Sela <fernando@ferimer.es>
 */

// Provider for Gallery 3 servers
// gallery3.js is required (https://github.com/ferimer/gallery3.js.git)
var providerGallery3 = (function provider_gallery3() {
  var g3 = null,
      url = '',
      key = '';

  return {
    name: 'Gallery 3',
    id: 'Gallery3',

    setParams: function(params) {
      url = params.url;
      key = params.key;
    },
    getParams: function() {
      return {
        url: url,
        key: key
      }
    },

    // TODO: Hacer la configuración de los providers dinámica
    getSetupForm: function() {
      return {
        url: {
          label: 'Server URL',
          type: 'text'
        },
        key: {
          label: 'REST Key',
          type: 'text'
        }
      };
    },

    getImage: function(url, callback) {
      if (typeof(callback) !== 'function') {
        return;
      }
      g3.getResource(url, function(img) {
        var localURL = URL.createObjectURL(img);
        callback(localURL);
        URL.revokeObjectURL(localURL);
      })
    },

    getResource: function(url, callback) {
      if (typeof(callback) !== 'function') {
        return;
      }
      g3.getResource(url, function(data) {
        callback(data);
      }, false);
    },

    getItem: function(item) {
      g3.getItem(item);
    },

    // Connect to the provider and start from main album
    start: function(callback) {
      g3 = new g3client(url, key);
      g3.onalbum = function onAlbum(data) {
        callback('album', data);
      };
      g3.onphoto = function onPhoto(data) {
        callback('photo', data);
      };
      g3.onmovie = function onMovie(data) {
        callback('movie', data);
      };
      g3.getItem();
    }
  }
})();

rg_providers.register(providerGallery3);
