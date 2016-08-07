angular
  .module('clothiesApp', [
    'ngRoute',
    'ngMessages',
    'ngMaterial',
    'angular-jwt'
  ])
  .config(configApp)
  .run(checkAuth);

/**
  * @ngdoc module
  * @name clothiesApp
  */

configApp.$inject = ['$routeProvider', '$httpProvider', 'jwtInterceptorProvider'];
function configApp($routeProvider, $httpProvider, jwtInterceptorProvider) {
  jwtInterceptorProvider.tokenGetter = ['auth', function(auth) {
    return auth.getToken();
  }];
  $httpProvider.interceptors.push('jwtInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'pages/home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: 'pages/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .when('/logout', {
      redirectTo: '/login',
      resolve: {
        loggedOut: ['auth', function (auth) {
          auth.logout();
          return true;
        }]
      }
    })
    .otherwise({
      redirectTo: '/'
    });
}



checkAuth.$inject = ['auth'];
function checkAuth(auth) {
  auth.getToken();
}
