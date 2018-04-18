var myApp=angular.module('myApp',[]); 

myApp.controller('stockCntrl',['$scope','$http','$window','$q',
function($scope,$http,$window,$q){

 $scope.usernamedetails = window.sessionStorage.getItem("username")
         
          if ($scope.usernamedetails == null) {
             //alert( $scope.usernamedetails);
              $window.location.href = "loginPage.html";
          };
  $scope.desgination = window.sessionStorage.getItem("desgination")

$scope.bit1 = {
    date2: new Date()
  };

  $scope.clearCall = function () {
    $scope.displayReport = '';
  } 
  $scope.stockVerifyPreview = function () {
    $scope.review="yes";
  	var fromdate  = new Date(((new Date($scope.bit1.date2).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.bit1.date2).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
              todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";

           var d  = new Date($scope.bit1.date2);
            d.setDate(d.getDate()-1);
               var previousDate  = new Date(((new Date(d).toISOString().slice(0, 23))+"-05:30")).toISOString();
     			previousDate = previousDate.slice(0,10);
           //  previousDate =previousDate+"T00:00:00.000Z";
             previousDate =previousDate+"T23:59:59.999Z";


  	$http.get('/stockVerifyPreview', {params:{"todate":todate,"fromdate":fromdate,"previousDate":previousDate}}).success(function(response){
      //alert(response.length);
      console.log(response);
      if(response.length == 0){
        alert(" No matches are found");
        $scope.displayReport = "";
      }else if (response.length == 1 && response[0].SaleCategory == "ands"&&response[0].cbgpcs == null &&response[0].opgpcs == 0) {
       // 0: SaleCategory: "ands"cbcount: nullcbgpcs: nullcbgwt: nullincount: "Valid"opcount: 0opgpcs: 0opgwt: 0__proto__: Objectlength: 1__proto__: Array(0)
           alert(" No matches are found");
           $scope.displayReport = "";

      }else{

             $scope.displayReport = response;
      }

     

    })
    // $http.get('/stockVerifyPreview').success(function(response){
    // })
  }

//alert("jjj")
}]);