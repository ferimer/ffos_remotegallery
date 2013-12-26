/**
 * Remote Gallery
 * (c) Ferimer, servicios informaticos, 2013 - All rights reserved
 * License: GNU Affero V3 (see LICENSE file)
 * Fernando Rodríguez Sela <fernando@ferimer.es>
 */

var rg_providers = (function rg_providers() {
  var providers = {};
  var current_provider = null;

  function addProvider(provider) {
    providers[provider.id] = provider;
  }

  return {
    register: function registerProvider(provider) {
      addProvider(provider);
      if (!current_provider)
        current_provider = this.getAll()[0];
    },

    getAll: function getAll() {
      return Object.keys(providers);
    },

    getCurrent: function getCurrentProvider() {
      return current_provider;
    },

    setCurrent: function setCurrentProvider(providerId) {
      current_provider = providerId;
    },

    get: function getProvider() {
      return providers[current_provider];
    }
  }
})();
