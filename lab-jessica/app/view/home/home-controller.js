'use strict';

require('./_home.scss');

module.exports = ['$log', 'galleryService', HomeController];

function HomeController($log, galleryService) {
  $log.debug('HomeController');

  this.galleries = [];

  this.fetchGalleries = function() {
    galleryService.fetchGalleries()
    .then(galleries => {
      this.galleries = galleries;
    });
  };

  this.fetchGalleries();
}
