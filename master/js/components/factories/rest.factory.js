(function () {
    'use strict';

    angular
        .module('app.factories')
        .factory('RestFactory', RestFactory);

    RestFactory.$inject = [
        '$http'
        , '$q'
        , '$localStorage'
        , '$httpParamSerializer'
        , '$rootScope'
        , '$sails'
    ];

    function RestFactory($http, $q, $localStorage, $httpParamSerializer, $rootScope, $sails) {

        function Factory(model_name, sails_on) {
            // console.log('Factory.model_name: ', model_name)
            this.model_name = model_name;
            this.endpoint = apiBaseUrl + prefix + "/" + this.model_name;
            this.get = get;
            this.find = find;
            this.create = create;
            this.update = update;
            this.destroy = destroy;
            this.customAction = customAction;
            this.upload = upload;

            // enable or disable requesting with sails socket.io
            /*
             true - use $sails provider
             false - use $http provider
             */
            this.sails = sails_on === true ? true : false
            // private methods
            this._buildPath = _buildPath;

            /*
             customAction is method to call any custom actions under model_name
             arguments: (method, action, body)
             i.e.
             @method: 'get' || 'put' || 'post' || 'delete'
             @action: '/someaction'
             @body: Object @optional

             request url will look like: apiBaseUrl + prefix + "/"+this.model_name + action
             */
            function customAction(method, action, body) {
                // sanitize inputs
                if (method) method = method.toLowerCase();
                if (action && action[0] != '/') action = '/' + action;

                var that = this;
                var deferred = $q.defer();
                var path = that._buildPath(that.endpoint + action);
                var promise;
                if (that.sails_on) {
                    promise = $sails.get(path).then(deferred.resolve, deferred.reject)
                } else {
                    var request;
                    if (body) {
                        request = $http[method](path, body)
                    } else {
                        request = $http[method](path)
                    }
                    promise = request.then(deferred.resolve, deferred.reject)
                }
                return deferred.promise;
            }

            function _buildPath(endpoint, query) {
                // console.log('_buildPath args: ', arguments)
                if (!_.isEmpty(query) && _.isObject(query)) {
                    return endpoint + "?" + $httpParamSerializer(query)
                } else if (_.isString(query) && !_.isEmpty(query)) {
                    return endpoint + "?" + $httpParamSerializer({id: query})
                } else {
                    return endpoint
                }
            }

            // public methods

            function get(id) {
                var that = this;
                var deferred = $q.defer();
                var path = _buildPath(that.endpoint + '/' + id);
                var promise;
                if (that.sails_on) {
                    promise = $sails.get(path).then(deferred.resolve, deferred.reject)
                } else {
                    promise = $http.get(path).then(deferred.resolve, deferred.reject)
                }
                return deferred.promise;
            }

            function find(query) {
                console.log("find query: ", query);
                var that = this;
                var deferred = $q.defer();
                var path = _buildPath(that.endpoint, query);
                var promise;
                if (that.sails_on) {
                    promise = $sails.get(path).then(deferred.resolve, deferred.reject)
                } else {
                    promise = $http.get(path).then(deferred.resolve, deferred.reject)
                }
                return deferred.promise;
            }

            function update(data) {
                var that = this;
                var deferred = $q.defer();
                var sanitize_data = _.omit(data, 'id');

                var path = '';

                if(data.endpoint) {
                    sanitize_data = _.omit(sanitize_data, 'endpoint');
                    path = _buildPath(that.endpoint + '/' + data.id + '/' + data.endpoint);
                }
                else {
                    path = _buildPath(that.endpoint + '/' + data.id);
                }

                var promise;
                if (that.sails_on) {
                    promise = $sails.put(path, sanitize_data).then(deferred.resolve, deferred.reject)
                } else {
                    promise = $http.put(path, sanitize_data).then(deferred.resolve, deferred.reject)
                }
                return deferred.promise;
            }

            function create(data) {
                var that = this;
                var deferred = $q.defer();
                var sanitize_data = _.omit(data, 'id');
                var path = _buildPath(that.endpoint);
                var promise;
                if (that.sails_on) {
                    promise = $sails.post(path, sanitize_data).then(deferred.resolve, deferred.reject)
                } else {
                    promise = $http.post(path, sanitize_data).then(deferred.resolve, deferred.reject)
                }
                return deferred.promise;
            }

            function destroy(query) {
                var that = this;
                var deferred = $q.defer();
                // var sanitize_data = _.omit(data, 'id')
                var path = _buildPath(that.endpoint, query);
                var promise;
                if (that.sails_on) {
                    promise = $sails.delete(path).then(deferred.resolve, deferred.reject)
                } else {
                    promise = $http.delete(path).then(deferred.resolve, deferred.reject)
                }
                return deferred.promise;
            }

            function upload(action, body){
                // sanitize inputs
                if (action && action[0] != '/') action = '/' + action;

                var that = this;
                var deferred = $q.defer();
                var path = that._buildPath(that.endpoint + action);
                var promise;
                var request;

                if (body) {
                    request = $http.post(path, body, 
                            {
                                withCredentials: true,
                                headers: {'Content-Type': undefined },
                                transformRequest: angular.identity
                            });
                } else {
                    request = $http.post(path);
                }
                promise = request.then(deferred.resolve, deferred.reject)
                return deferred.promise;                
            }
        }

        return Factory;
    }
})();
