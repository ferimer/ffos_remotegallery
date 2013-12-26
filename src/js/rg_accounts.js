/**
 * Remote Gallery
 * (c) Ferimer, servicios informaticos, 2013 - All rights reserved
 * License: GNU Affero V3 (see LICENSE file)
 * Fernando Rodríguez Sela <fernando@ferimer.es>
 */

// Almacena con localStorage. Funciones para obtener listado de cuentas. Para obtener una en concreto y almacenar
var rg_accounts = (function rg_accounts() {
  var accounts = {};
  var storageItemName = 'rg_accounts_data';

  function store() {
    localStorage.setItem(storageItemName, JSON.stringify(accounts));
  }
  function recover() {
    try {
      accounts = JSON.parse(localStorage.getItem(storageItemName));
    } catch(e) {
      accounts = {};
    }
  }

  recover();

  return {
    getAll: function getAccounts() {
      return Object.keys(accounts);
    },
    get: function getAccount(accountName) {
      return accounts[accountName];
    },
    set: function setAccount(accountData) {
      accounts[accountData.name] = accountData;
      store();
    },
    del: function delAccount(accountName) {
      accounts[accountName] = undefined;
      store();
    }
  }
})();