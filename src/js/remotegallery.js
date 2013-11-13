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

function remotegallery() {
  this.init();
}

remotegallery.prototype = {
  init: function init() {
    this.mainTitle = document.getElementById('page_title');
    this.pages = document.getElementsByClassName('page');
    this.showPage('home_page');

    getTextFile('version.info', function onVersionInfo(response) {
      document.getElementById('about_version').textContent = response;
    });
    getTextFile('LICENSE', function onLICENSE(response) {
      document.getElementById('license').textContent = response;
    });
  },

  // Pages management
  hidePages: function hidePages() {
    for (var i=0; i<this.pages.length; i++) {
      this.pages[i].classList.remove('visible');
    }
  },

  showPage: function showPage(pageid) {
    this.hidePages();
    this.mainTitle.textContent =
      this.pages[pageid].getElementsByTagName('title')[0].textContent;
    this.pages[pageid].classList.add('visible');
  },

  // Accounts setup
  addAccount: function addAccount() {
    this.showPage('config_page');
  }
}

rg_kernel = new remotegallery();
