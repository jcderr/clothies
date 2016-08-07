angular
  .module('clothiesApp')
  .factory('requester', requester);


/**
  * @ngdoc service
  * @name requester
  * @module adminNext
  *
  * @description
  * Chainable wrapper for $http that adds convienience methods for data, formData, auth, get, post, put, patch, delete, headers
  */


requester.$inject = ['$http'];
function requester($http) {
  var token;
  return createInstance();

  // create new service instance
  function createInstance() {
    return {
      get: get,
      post: post,
      put: put,
      patch: patch,
      del: del,
      head: head,
      headers: headers,
      data: data,
      formData: formData,
      send: send
    };
  }

  // return new instance if one was not create
  function getInstance(self) {
    var instance = self._created ? self : createInstance();
    instance._created = true;
    return instance;
  }


  /**
   * @ngdoc method
   * @name requester#get
   * @function
   *
   * @description
   * set method to `GET` and set url
   *
   * @param {string} url - url
   *
   * @return {requester} - instance of the service
   */
  function get(url) {
    /*jshint validthis:true*/
    var instance = getInstance(this);
    instance.method = 'GET';
    instance.url = url;
    return instance;
  }

  /**
   * @ngdoc method
   * @name requester#post
   * @function
   *
   * @description
   * set method to `POST` and set url
   *
   * @param {string} url - url
   *
   * @return {requester} - instance of the service
   */
  function post(url) {
    /*jshint validthis:true*/
    var instance = getInstance(this);
    instance.method = 'POST';
    instance.url = url;
    return instance;
  }

  /**
   * @ngdoc method
   * @name requester#put
   * @function
   *
   * @description
   * set method to `PUT` and set url
   *
   * @param {string} url - url
   *
   * @return {requester} - instance of the service
   */
  function put(url) {
    /*jshint validthis:true*/
    var instance = getInstance(this);
    instance.method = 'PUT';
    instance.url = url;
    return instance;
  }

  /**
   * @ngdoc method
   * @name requester#patch
   * @function
   *
   * @description
   * set method to `PATCH` and set url
   *
   * @param {string} url - url
   *
   * @return {requester} - instance of the service
   */
  function patch(url) {
    /*jshint validthis:true*/
    var instance = getInstance(this);
    instance.method = 'PATCH';
    instance.url = url;
    return instance;
  }

  /**
   * @ngdoc method
   * @name requester#del
   * @function
   *
   * @description
   * set method to `DELETE` and set url
   *
   * @param {string} url - url
   *
   * @return {requester} - instance of the service
   */
  function del(url) {
    /*jshint validthis:true*/
    var instance = getInstance(this);
    instance.method = 'DELETE';
    instance.url = url;
    return instance;
  }

  /**
   * @ngdoc method
   * @name requester#head
   * @function
   *
   * @description
   * set method to `HEAD` and set url
   *
   * @param {string} url - url
   *
   * @return {requester} - instance of the service
   */
  function head(url) {
    /*jshint validthis:true*/
    var instance = getInstance(this);
    instance.method = 'HEAD';
    instance.url = url;
    return instance;
  }


  /**
   * @ngdoc method
   * @name requester#headers
   * @function
   *
   * @description
   * add headers to request
   *
   * @param {object} obj - headers object
   *
   * @return {requester} - instance of the service
   */
  function headers(obj) {
    /*jshint validthis:true*/
    var instance = getInstance(this);
    instance.requestHeaders = obj;
    return instance;
  }


  /**
   * @ngdoc method
   * @name requester#data
   * @function
   *
   * @description
   * add data to request
   *
   * @param {object} obj - data object
   *
   * @return {requester} - instance of the service
   */
  function data(obj) {
    /*jshint validthis:true*/
    var instance = getInstance(this);
    instance.requestData = obj;
    return instance;
  }


  /**
   * @ngdoc method
   * @name requester#formData
   * @function
   *
   * @description
   * transform single layer object into form data.
   * this is for backwards compatibility and should not be used for new endpoints
   *
   * @param {object} obj - data object
   *
   * @return {requester} - instance of the service
   */
  function formData(obj) {
    /*jshint validthis:true*/
    var instance = getInstance(this);
    instance.requestFormData = Object.keys(obj).map(function (key) {
      return key+'='+obj[key];
    }).join('&');
    return instance;
  }



  /**
   * @ngdoc method
   * @name requester#send
   * @function
   *
   * @description
   * send request
   *
   * @param {sendCallback=} callback - optional callback
   *
   * @return {promise} - $http promise
   */
   /**
    * @callback sendCallback
    * @param {object} error - error response from request. if no error exists this will be undefined
    * @param {any} data - returned data from request
    * @param {function} header - call this function with the header name to get value
    */
  function send(callback) {
    /*jshint validthis:true*/
    var instance = this;
    if (instance._created === undefined || instance.url === undefined) {
      throw Error('Cannot send call without setting mehtod and url');
    }
    var url = instance.url;
    if (instance.requestFormData) {
      url += url.indexOf('?') === -1 ? '?'+instance.requestFormData : '&'+instance.requestFormData;
    }
    var headers = instance.requestHeaders || {};
    if (instance.token) {
      headers['x-session-token'] = instance.token;
    }
    if (url.indexOf('/api/') === -1) {
      headers.skipAuthorization = true;
    }
    return $http({
      method: instance.method,
      url: url,
      headers: headers,
      data: instance.requestData
    }).then(function (response) {
      if (typeof callback === 'function') { callback(undefined, response.data, response.headers); }
      return response;
    }).catch(function (response) {
      if (typeof callback === 'function') { callback(response); }
      return response;
    });
  }
}
