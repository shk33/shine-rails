describe("CustomerDetailController", function() {
  describe("Initialization", function() {
    var scope = null,
        controller = null,
        httpBackend = null,
        id          = 42,
        customer =  {
            id: id,
            first_name: "Bob",
            last_name: "Jones",
            email: "bjones@foo.net",
            username: "jonesy",
            created_at: "2014-01-03T11:12:34"
          };

    /*
    * Before Each Statements
    */
    beforeEach(module("customers"));

    beforeEach(inject(function ($controller, $rootScope,$routeParams, $httpBackend) {
      scope       = $rootScope.$new();
      httpBackend = $httpBackend;

      $routeParams.id = id;

      httpBackend.when('GET','/customers/'+ id +'.json')
        .respond(customer);

      controller  = $controller("CustomerDetailController", {
        $scope: scope
      });
    }));

    /*
    * Tests starts here
    */
    it("features the customer from the back-end", function () {
      httpBackend.flush();
      expect(scope.customer).toEqualData(customer);  
    });

  });
});