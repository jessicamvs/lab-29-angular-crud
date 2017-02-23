'use strict';

require('./_logout.scss');

module.exports = {
  template: require('./logout.html'),
  controller: ['$log', '$location', 'authService', LogoutController],
  controllerAs: 'logoutCtrl'
};

function LogoutController($log, $location, authService) {
  $log.debug('LogoutController');

  this.logout = function() {
    $log.log('logoutCtrl.logout()');

    authService.logout()
    .then( () => {
      $location.url('/join#signup');
    });
  };
}
