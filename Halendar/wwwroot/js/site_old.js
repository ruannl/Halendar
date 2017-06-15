(function () {
    "use strict";

    var app = angular.module("SocialDeck", ["ngRoute", "rlsGeolocator", "rlsOpenWeatherMap", "rlsGoogleApi"]);

    var appConfig = function (OpenWeatherMapProvider, GoogleApiProvider) {
        OpenWeatherMapProvider.setApiKey("0ab456f7ab8ac816c98fbbbc40a180c6");
        OpenWeatherMapProvider.setApiVersion("2.5");
        OpenWeatherMapProvider.init();

        GoogleApiProvider.setGoogleId("291775119431-j02fpaut4qha4pbv4v3l9jvoicn6lg4q.apps.googleusercontent.com");
        GoogleApiProvider.setApiKey("AIzaSyCaI624h45CAwXk1UxQhKcT5ZPmNG0kXaA");
        GoogleApiProvider.setDiscoveryDocs(["https://people.googleapis.com/$discovery/rest"]);
        GoogleApiProvider.setGoogleScopes(["profile", "https://www.googleapis.com/auth/calendar.readonly"]);
    };

    var weatherController = function ($scope, $log, $filter, GeolocatorService, OpenWeatherMap) {

        var getCurrentWeatherResponse = function (response) {
            $scope.currentWeather = response;
        };

        var handleGeolocatorError = function (error) {
            $log.error(error);
        };

        var GetCurrentWeather = function (location) {
            OpenWeatherMap.getCurrentWeather(location.coords.latitude, location.coords.longitude)
                .then(getCurrentWeatherResponse, handleGeolocatorError);
        };

        var GetWeatherForecast = function (location) {
            OpenWeatherMap.getWeatherForecast(location.coords.latitude, location.coords.longitude)
                .then(function (response) {
                    var today = $filter("date")(new Date(), "yyyy-MM-dd");
                    $scope.todaysForecast = $filter("filter")(response.items, { date: today });
                });
        };

        GeolocatorService.watchPosition().then(GetCurrentWeather, handleGeolocatorError);
    };

    var calendarController = function ($scope, GoogleApi) {
        $scope.model = {};

        var x = GoogleApi.getCalendars();
        console.log(x);
    };

    app.config(["rlsOpenWeatherMapProvider","rlsGoogleApiProvider", appConfig])
        .controller("WeatherCtrl", ["$scope", "$log", "$filter", "rlsGeolocatorService", "rlsOpenWeatherMap", weatherController])
        .controller("CalendarCtrl", ["$scope", "rlsGoogleApi", calendarController]);

})();
