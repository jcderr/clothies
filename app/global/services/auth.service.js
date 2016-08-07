angular
  .module('clothiesApp')
  .factory('auth', authService);


/**
  * @ngdoc service
  * @name auth
  * @module clothiesApp
  *
  * @description
  * Auth handles login, logout, and token verification
  */

authService.$inject = ['requester', '$location', 'jwtHelper'];
function authService(requester, $location, jwtHelper) {
  var token;
  var tokenPayload;
  var service = {
    login: login,
    logout: logout,
    getToken: getToken,
    getPayload: getPayload
  };
  return service;



  /**
   * @ngdoc method
   * @name auth#login
   * @function
   *
   * @description
   * login and get jwt token
   *
   * @param {string} email - user email
   * @param {string} password - user password
   */
  function login(email, password) {
    return requester
      .post('auth/login')
      .data({
        email: email,
        password: password
      })
      .send()
      .then(function (response) {
        setToken(response.data.token);
        $location.url('/');
      });
  }


  /**
   * @ngdoc method
   * @name auth#logout
   * @function
   *
   * @description
   * clear token and redirect to login
   */
  function logout() {
    clearToken();
    $location.url('login');
  }


  /**
   * @ngdoc method
   * @name auth#getToken
   * @function
   *
   * @description
   * get token from memeory or sessionStorage
   * if no token is found then redirect to login
   */
  function getToken() {
    if (token === undefined) {
      token = window.localStorage.getItem('_bearer_token') || undefined;
    }

    // if token is invalid redirect to login page
    if (token === undefined || jwtHelper.getTokenExpirationDate(token)) {
      $location.url('login');
      return;
    }

    return token;
  }


  /**
   * @ngdoc method
   * @name auth#getPayload
   * @function
   *
   * @description
   * get data stored in the jwt token payload
   */
  function getPayload() {
    getToken();

    if (token !== undefined && tokenPayload === undefined) {
      tokenPayload = jwtHelper.decodeToken(token);
    }

    return tokenPayload;
  }



  function clearToken() {
    token = undefined;
    tokenPayload = undefined;
    window.localStorage.removeItem('_bearer_token');
  }

  function setToken(_token) {
    token = _token;
    window.localStorage.setItem('_bearer_token', token);
  }
}
