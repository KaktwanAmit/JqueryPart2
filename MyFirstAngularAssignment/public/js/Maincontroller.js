var myapp = angular.module('olympic', []);

myapp.directive('myCrud', function() {
    return {
        restrict: 'AE',
        templateUrl: 'my-crud.html'
    };

});

myapp.controller('mycon', function($scope, dataService) {
    var start = 0;
    var count = 0;
    var items_per_page = 10;
    $scope.prev = false;
    $scope.next = false;
    $scope.fetchPlayer = function(txtSearch) {
        dataService.fetchPlayer(txtSearch)
            .then(function(response) {
                if (response.data == '') {
                    alert('please enter the correct data')
                } else {
                    $scope.players = response.data;
                }

            });
    }

    $scope.loadAll = function() {
        if (start == 0) {
            $scope.prev = false;

        }
        $scope.next = true;
        dataService.loadAll(start)
            .then(function(response) {
                $scope.players = response.data;
            });

    }
    $scope.nextVal = function() {
        start = start + 10;
        var limit = 0;
        if (start >= 10) {
            $scope.prev = true;
            $scope.next = true;
        }
        dataService.next(start,items_per_page)
            .then(function(response) {
                $scope.players = response.data;
                limit = (response.data.length);
                if (limit < items_per_page) {
                    console.log("limit is less");
                    $scope.next = false;
                } else {
                    $scope.next = true;
                }
            })


    }
    $scope.prevVal = function() {
        start = start - 10;
        if (start == 0) {
            $scope.prev = false;
            $scope.next = true;
        } else {
            $scope.prev = true;
        }
        $scope.next = true;
        dataService.prev(start)
            .then(function(response) {
                $scope.players = response.data;
            })

    }
    $scope.edit = function(id) {

        dataService.edit(id)
            .then(function(response) {
                $scope.Details = response.data;

            });
    }
    $scope.addPlay = function() {
        $scope.Details = {};
    }
    $scope.delete = function(id) {
        dataService.delete(id)
            .then(function(response) {
                alert("player" + id + "deleted");
            });
    }

    $scope.addPlayers = function() {
        dataService.addPlayers($scope.Details)
            .then(function(response) {
                console.log(response);
                $scope.Details = [response];
                alert("successfully submitted");
            })
    }
    $scope.updatePlayers = function(id, Details) {
        dataService.updatePlayers(id, Details)
            .then(function(response) {
                $scope.Details = [response];
                alert("successfully updated");

            })
    }
});
