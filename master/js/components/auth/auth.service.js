(function () {
  'use strict';

  angular
    .module('app.auth')
    .service('AuthService', AuthService);

  AuthService.$inject = ['AUTH_CFG', '$http', '$q', '$localStorage', '$httpParamSerializer', '$rootScope'];

  function AuthService(AUTH_CFG, $http, $q, $localStorage, $httpParamSerializer, $rootScope) {

    this.register = register;
    this.login = login;
    this.me = me;
    this.resetPassword = resetPassword;
    this.findByPassResetToken = findByPassResetToken;
    this.setPassword = setPassword;
    this.getVerified = getVerified;
    this.logout = logout;
    this.verify = verify;
    this.isAuthenticated = isAuthenticated;
    this.changePassword = changePassword;
    // serialize object to query string
    function _buildPath(endpoint, query) {
      if (!_.isEmpty(query)) {
        return endpoint + "?" + $httpParamSerializer(query)
      } else {
        return endpoint
      }
    }

    //////////////////////////////

    function login(body) {
      var deferred = $q.defer();
      var path = _buildPath(AUTH_CFG.endpoint + '/login');
      var promise = $http.post(path, body)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err, status, headers, config) {
          // console.log('response: ',  arguments)
          if (status == 403) deferred.notify(status);
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function register(body) {
      var deferred = $q.defer();
      var path = _buildPath(AUTH_CFG.endpoint + '/register');
      var promise = $http.post(path, body)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err, status, headers, config) {
          deferred.reject(err);
        });
      return deferred.promise;
    }
    function resetPassword(body) {
      var deferred = $q.defer();
      var path = _buildPath(AUTH_CFG.endpoint + '/resetPassword');
      var promise = $http.post(path, body)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err, status, headers, config) {
          deferred.reject(err);
        });
      return deferred.promise;
    }
    function findByPassResetToken(token) {
      var deferred = $q.defer();
      var path = _buildPath(AUTH_CFG.endpoint + '/findByPassResetToken', {token: token});
      var promise = $http.get(path)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err, status, headers, config) {
          deferred.reject(err);
        });
      return deferred.promise;
    }
    function setPassword(token, body) {
      var deferred = $q.defer();
      var path = _buildPath(AUTH_CFG.endpoint + '/setPassword', {token: token});
      var promise = $http.post(path, body)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err, status, headers, config) {
          deferred.reject(err);
        });
      return deferred.promise;
    }
    // request verification link again
    function getVerified(email) {
      var deferred = $q.defer();
      var path = _buildPath(AUTH_CFG.endpoint + '/getVerified', {email: email});
      var promise = $http.get(path)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err, status, headers, config) {
          deferred.reject(err);
        });
      return deferred.promise;
    }
    // that action used only from link in activation email
    /*
     @body: {
     verification: string
     password: 8-32 signs
     }
     */
    function verify(body) {
      var deferred = $q.defer();
      var path = _buildPath(AUTH_CFG.endpoint + '/verify');
      var promise = $http.put(path, body)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err, status, headers, config) {
          deferred.reject(err);
        });
      return deferred.promise;
    }
    /*
     @body: {
     password_new: 8-32 signs
     password: 8-32 signs
     }
     */
    function changePassword(body) {
      var deferred = $q.defer();
      var path = _buildPath(AUTH_CFG.endpoint + '/changePassword');
      var promise = $http.post(path, body)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err, status, headers, config) {
          deferred.reject(err);
        });
      return deferred.promise;
    }
    
    function isAuthenticated() {
      return !_.isEmpty($localStorage.authorization) && _.isEmpty($localStorage.user);
    }

    function me() {
      var deferred = $q.defer();
      var path = _buildPath(AUTH_CFG.endpoint + '/me');
      var promise = $http.get(path)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err, status, headers, config) {
          deferred.reject(err);
        });
      return deferred.promise;
    }
    // not implemented on api yet
    function logout() {
      console.log('logout not implemented on API side')
    }
  }
})();