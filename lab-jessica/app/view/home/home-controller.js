'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController];

function HomeController($log, $rootScope, galleryService) {
  $log.debug('HomeController');

  this.galleries = [];
  this.hideEditForm = true;

  this.fetchGalleries = function() {
    galleryService.fetchGalleries()
    .then(galleries => {
      this.galleries = galleries;
    });
  };

  this.deleteGallery = function(id) {
    galleryService.deleteGallery(id)
    .then(() => {
      this.fetchGalleries();
    });
  };

  this.updateGallery = function(gallery) {
    $log.log('updateGallery', gallery);
    galleryService.updateGallery(gallery)
    .then(() => {
      this.fetchGalleries();
      this.hideEditForm = true;
    });
  };

  this.fetchGalleries();

  // $rootScope.$on('$locationChangeSuccess', () => {
  //   this.fetchGalleries();
  // });
}
