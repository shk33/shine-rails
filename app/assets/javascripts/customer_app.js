/**
*  customers Module
*
* Description
*/
var app = angular.module('customers', [
  'ngRoute',
  'ngResource',
  'ngMessages',
  'templates'
  ]);

app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
  .when("/", {
    controller:  "CustomerSearchController",
    templateUrl: "customer_search.html"
  })
  .when("/:id", {
    controller:  "CustomerDetailController",
    templateUrl: "customer_detail.html"
  })
}])

app.controller('CustomerSearchController', [
    '$scope',
    '$http', 
    '$location',
    function ($scope, $http, $location) {
      $scope.page = 0;
      $scope.customers = [];

      $scope.search = function (searchTerm, isNew) {
        if (searchTerm.length < 3) {
          return;
        }

        if (isNew) {
          $scope.page = 0;
        }

        $http.get("/customers.json", 
          {"params": {"keywords": searchTerm, "page": $scope.page}}
          ).then(function (response) {
            $scope.customers = response.data;
          }, function (response) {
            alert('There was a problem ' + response.status);
          });
      }

      $scope.viewDetails = function (customer) {
        $location.path("/" + customer.id);
      }

      $scope.previousPage = function () {
        if ($scope.page > 0) {
          $scope.page = $scope.page -1;
          $scope.search($scope.keywords, false);
        }
      }

      $scope.nextPage = function () {
        $scope.page = $scope.page + 1;
        $scope.search($scope.keywords, false);
      }

    }
]);

app.controller("CustomerDetailController", [
  "$scope",
  "$http",
  "$routeParams",
  "$resource",
  function ($scope, $http, $routeParams, $resource) {
    $scope.customerId = $routeParams.id;
    var Customer = $resource('/customers/:customerId.json');

    $scope.customer = Customer.get({ "customerId": $scope.customerId});

    $scope.save = function() {
      if ($scope.form.$valid) {
        alert("Saved!!!");
      }
    }
  }
]);

app.controller("CustomerCreditCardController", [
  "$scope",
  "$resource",
  function ($scope, $resource) {
    var CreditCardInfo = $resource('/fake_billing.json');
    $scope.setCardholderId = function (cardholderId) {
      $scope.creditCard = CreditCardInfo.get(
        { "cardholder_id": cardholderId}
      );
    }
  }
]);