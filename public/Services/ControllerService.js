<<<<<<< HEAD
angular.module('myApp').factory('ControllerService', ['$http', '$q',  function($http, $q) {
    console.log("ControllerService");
    //alert("gigigi")
=======
angular.module('myApp').factory('ControllerService', ['$http', '$q','$window',  function($http, $q,$window) {
    console.log("ControllerService");
    //alert("gigigi")
    //$window.location.href = "loginPage.html"
>>>>>>> cc45d5087f19638a7317db6078422156a466a9d0
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
<<<<<<< HEAD
=======
        var validationCall = function(){
                   // alert(" getTaxwithinState in factory call ")      
              return 100; 
        }
>>>>>>> cc45d5087f19638a7317db6078422156a466a9d0

    
            return{
                getTaxwithinState:getTaxwithinState,
                getTaxOutState:getTaxOutState,
<<<<<<< HEAD
=======
                validationCall:validationCall,
>>>>>>> cc45d5087f19638a7317db6078422156a466a9d0
            }
       
}]);