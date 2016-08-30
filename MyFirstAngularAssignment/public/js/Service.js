myapp.factory('dataService', ['$http', function($http) {
    var obj = {};
    obj.delete = function(id) {
    	return $http.delete('http://localhost:8080/players/'+id);
    }
    obj.addPlayers=function(Details){
 	// console.log(Details);
 	return	$http.post('http://localhost:8080/players/',Details);
	 }
 	obj.edit=function(id){
		return $http.get('http://localhost:8080/players/'+id);
	}
	obj.fetchPlayer=function(txtSearch){
		return $http.get('http://localhost:8080/players?id=' + txtSearch);
	}
	obj.loadAll=function(start)
	{
		return  $http.get('http://localhost:8080/players?_start=' + start + '&_limit=10');
	}
	obj.updatePlayers=function(id,Details)
	{
		return  $http.put('http://localhost:8080/players/'+id,Details);
	}
	obj.next=function(start,items_per_page){
		console.log(start);
		console.log(items_per_page);
		return $http.get('http://localhost:8080/players?_start=' + start + '&_limit=' + items_per_page);
	}
	obj.prev=function(start){
		return $http.get('http://localhost:8080/players?_start=' + start + '&_limit=10')
	}
    return obj;
}]);
