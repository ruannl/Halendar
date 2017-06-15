(function () {
    "use strict";

    var settings = {
        apiKey: "",
        googleId: "",
        discoveryDocs: [],
        scopes: [],
        loaded: false
    };

    var googleApiDefer;

    var runGoogleApi = function ($window, $q, $log) {
        googleApiDefer = $q.defer();

        var initGoogleClient = function () {

            $window.gapi.client.init({
                "apiKey": settings.apiKey,
                "discoveryDocs": settings.discoveryDocs,
                "clientId": settings.clientId,
                "scope": "profile"
            }).then(function () {
                $log.info("Google Api Initialized");
                googleApiDefer.resolve();
            }, function (error) {
                $log.error(error);
                googleApiDefer.reject(error);
            });
        };

        // function loginStatus(user) {
        //     var profile = user.getBasicProfile();
        //     console.log("Name: " + profile.getName());
        // }

        $window.gapi.load("client:auth2", initGoogleClient);
    };

    var googleApiService = function ($http, $q, $filter) {

        function GoogleApi() {

            // apiKey = settings.apiKey;
            // googleId = settings.googleId;
            // discoveryDocs = settings.discoveryDocs;
            // scopes = settings.scopes;
        }

        GoogleApi.prototype.authorize = function () {

        };

        GoogleApi.prototype.getCalendars = function () {


        };

        return new GoogleApi();
    };

    var googleApiProvider = function () {

        settings.apiKey = null;
        setApiKey = function (apiKey) {
            settings.apiKey = apiKey;
        };
        getApiKey = function () {
            return settings.apiKey;
        };

        settings.googleId = null;
        setGoogleId = function (id) {
            settings.googleId = id;
        };
        getGoogleId = function () {
            return settings.googleId;
        };

        discoveryDocs = null;
        setDiscoveryDocs = function (docs) {
            settings.discoveryDocs = docs;
        };
        getDiscoveryDocs = function () {
            return settings.discoveryDocs;
        };

        googleScopes = null;
        setGoogleScopes = function (scopes) {
            settings.googleScopes = scopes;
        };
        getGoogleScopes = function () {
            return settings.googleScopes;
        };

        loaded = false;

        $get = ["$http", "$q", "$filter", googleApiService];
    };

    angular.module("rlsGoogleApi", [])
        .value("settings", settings)
        .run(["$window", "$q", runGoogleApi])
        .provider("rlsGoogleApi", [googleApiProvider]);

})()