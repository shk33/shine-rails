describe("CustomerSearchController", function() {
  describe("Initialization", function() {
    var scope = null,
        controller = null,
        httpBackend = null,
        serverResults = [
          {
            id: 123,
            first_name: "Bob",
            last_name: "Jones",
            email: "bjones@foo.net",
            username: "jonesy"
          },
          {
            id: 456,
            first_name: "Bob",
            last_name: "Johnsons",
            email: "johnboy@bar.info",
            username: "bobbyj"
          }
        ];
    
    /*
    * Before Each Statements
    */
    beforeEach(module("customers"));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
      scope       = $rootScope.$new();
      httpBackend = $httpBackend;
      controller  = $controller("CustomerSearchController", {
        $scope: scope
      });
    }));

    beforeEach(function() {
      httpBackend.when('GET','/customers.json?keywords=bob&page=0')
        .respond(serverResults);
    });


    /*
    * Tests starts here
    */
    it("defaults to an empty customer list", function() {
      expect(scope.customers).toEqualData([]);
    });

    it("populates the customer list with the results", function () {
      scope.search('bob');
      httpBackend.flush();
      expect(scope.customers).toEqualData(serverResults);  
    });

  });
});