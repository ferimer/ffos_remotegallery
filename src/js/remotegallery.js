/**
 * Remote Gallery
 * (c) Ferimer, servicios informaticos, 2013 - All rights reserved
 * License: GNU Affero V3 (see LICENSE file)
 * Fernando Rodríguez Sela <fernando@ferimer.es>
 */

var rg_kernel = (function remotegallery() {
  var configured_accounts = document.getElementById('configured_accounts');
  var pageTitle = document.getElementById('page_title');
  var pages = document.getElementsByClassName('page');

  function init() {
    getTextFile('version.info', function onVersionInfo(response) {
      document.getElementById('about_version').textContent = response;
    });
    getTextFile('LICENSE', function onLICENSE(response) {
      document.getElementById('license').textContent = response;
    });

    // TODO: Agregar el proveedor al combo de configuración
    console.log('TODO: Proveedores: ' + JSON.stringify(rg_providers.getAll()));

    // Load accounts list
    rg_accounts.getAll().forEach(function(accountName) {
      addAccount(accountName);
    });

    registerConfigMethods();
  }

  function hide_pages() {
    for (var i=0; i<pages.length; i++) {
      pages[i].classList.remove('visible');
    }
  }

  function show_page(pageId) {
    hide_pages();
    pageTitle.textContent =
      pages[pageId].getElementsByTagName('title')[0].textContent;
    pages[pageId].classList.add('visible');
  }

  init();
  show_page('home_page');

  ////////////////////////////////////////////////////////////////////////////
  // Account management methods
  ////////////////////////////////////////////////////////////////////////////
  function addAccount(accountName) {
    var a = document.createElement('a');
    a.textContent = accountName;
    a.href = '#content';
    a.onclick = function openAccount() {
      var accountData = rg_accounts.get(accountName);
      rg_kernel.openAccount(accountData);
    }

    var li = document.createElement('li');
    li.appendChild(a);
    configured_accounts.appendChild(li);
  }

  function registerConfigMethods() {
    function save_config() {
      rg_kernel.showPage('loading_page');

      var config_data = {
        type: document.getElementById('config_accounttype').value,
        name: document.getElementById('config_accountname').value,
        data: {
          url: document.getElementById('url').value,
          key: document.getElementById('key').value
        }
      };

      rg_accounts.set(config_data);
      addAccount(config_data.name);
      openAccount(config_data);
    }
    document.getElementById('config_save').onclick = save_config;
  }

  return {
    showPage: function showPage(pageid) {
      show_page(pageid);
    },

    // Accounts setup
    addAccount: function addAccount() {
      this.showPage('config_page');
    },

    openAccount: function openAccount(accountData) {
      rg_providers.setCurrent(accountData.type);
      var provider = rg_providers.get();
      provider.setParams(accountData.data);
      provider.start();
      this.showPage('loading_page');
    }
  }
})();
