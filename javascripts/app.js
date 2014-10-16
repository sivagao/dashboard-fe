var app = angular.module("TeamDashboard", ["ngResource", "ngSanitize", "ngRoute", "ui.bootstrap"]);

app.config(["$routeProvider", "$locationProvider",
    function($routeProvider, $locationProvider) {
        // $locationProvider.html5Mode(true).hashPrefix('#!');
        $routeProvider
            .when("/dashboards", {
                templateUrl: 'templates/dashboards/index.html',
                controller: "DashboardIndexCtrl"
            })
            .when("/dashboards/:id", {
                templateUrl: 'templates/dashboards/show.html.erb',
                controller: "DashboardShowCtrl"
            })
            .when("/about", {
                templateUrl: 'templates/abouts/show.html',
                controller: "AboutCtrl"
            });
        $routeProvider.otherwise({
            redirectTo: '/dashboards'
        });
    }
]);

app.factory('apiHelperInterceptor', [

    function() {
        return {
            request: function(config) {
                if (config.url.indexOf('/api') >= 0) {
                    config.url = config.url.replace(/^(http:.*)?\/api/, 'http://localhost:3000/api')
                }
                return config;
            }
        }
    }
]);

app.config(["$httpProvider",
    function($httpProvider) {
        // $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        $httpProvider.defaults.headers.common['Accept'] = "application/json";
        $httpProvider.defaults.headers['common']['X-Requested-With'] = 'XMLHttpRequest';

        $httpProvider.interceptors.push('apiHelperInterceptor');
    }
]);

app.constant("DASHBOARD_COLUMN_COUNT", 4);

// use angular/mustache style {{variable}} interpolation
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};