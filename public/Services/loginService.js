angular.module('myApp').factory('LoginService', ['$http', '$q',  function($http, $q) {
    console.log("LoginService");
    //alert("gigigi")
        var getTaxwithinState = function(){
                   // alert(" getTaxwithinState in factory call ")      
                return $http({
                        url: '/Transaction.html',
                        method: 'GET',
                });
        }
        

    
            return{
                getTaxwithinState:getTaxwithinState,
                getTaxOutState:getTaxOutState,
            }
       
}]);