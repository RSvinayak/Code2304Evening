angular.module('myApp').factory('ControllerService', ['$http', '$q','$window',  function($http, $q,$window) {
    console.log("ControllerService");
    //alert("gigigi")
    //$window.location.href = "loginPage.html"
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
        var validationCall = function(){
                   // alert(" getTaxwithinState in factory call ")      
              return 100; 
        }

    
            return{
                getTaxwithinState:getTaxwithinState,
                getTaxOutState:getTaxOutState,
                validationCall:validationCall,
            }
       
}]);