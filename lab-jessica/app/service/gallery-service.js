'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService) {
  $log.debug('galleryService');

  let service = {};
  service.galleries = [];

  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      return $http.post(url, gallery, config);
    })
    .then(res => {
      $log.log('gallery created');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then(res => {
      $log.log('galleries fetched');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch(err =>{
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function(id) {
    $log.debug('galleryService.deleteGallery()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${id}`;
      let config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      return $http.delete(url, config);
    })
    .then(() => {
      $log.log('gallery deleted');
      service.fetchGalleries();
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateGallery = function(gallery) {
    $log.debug('galleryService.updateGallery()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${gallery._id}`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      return $http.put(url, gallery, config);
    })
    .then(() => {
      $log.log('gallery updated');
      service.fetchGalleries();
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
