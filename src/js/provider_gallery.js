/**
 * Remote Gallery
 * (c) Ferimer, servicios informaticos, 2013 - All rights reserved
 * License: GNU Affero V3 (see LICENSE file)
 * Fernando Rodríguez Sela <fernando@ferimer.es>
 */

// Provider for Gallery 3 servers
// gallery3.js is required (https://github.com/ferimer/gallery3.js.git)
var providerGallery3 = (function provider_gallery3() {
  var url = '',
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

    // Connect to the provider and start from main album
    start: function(callback) {
      console.log(url);
    }
  }
})();

rg_providers.register(providerGallery3);
