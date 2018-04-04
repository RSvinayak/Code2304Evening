angular.module('myApp').factory('ControllerService', ['$http', '$q',  function($http, $q) {
    console.log("ControllerService");
    //alert("gigigi")
        var getTaxwithinState = function(){
                   // alert(" getTaxwithinState in factory call ")      
                return $http({
                        url: '/apigettaxwithinstate',
                        method: 'GET',
                });
        }
         var getTaxOutState = function(){
                   // alert(" getTaxwithinState in factory call ")      
               return  $http({
                        url: '/apigettaxoutstate',
                        method: 'GET',
                })
                 
        }

    
            return{
                getTaxwithinState:getTaxwithinState,
                getTaxOutState:getTaxOutState,
            }
       
}]);