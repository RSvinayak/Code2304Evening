var myApp=angular.module('myApp',[]);
myApp.controller('PdfCntrl',['$scope','$http','$window',
function($scope,$http,$window){
<<<<<<< HEAD
=======
  $scope.usernamedetails = window.sessionStorage.getItem("username")
  if ($scope.usernamedetails == null) {
             //alert( $scope.usernamedetails);
              $window.location.href = "loginPage.html";
          };
>>>>>>> cc45d5087f19638a7317db6078422156a466a9d0
  $scope.userdi=[];
  var purityName=JSON.parse(window.sessionStorage.getItem("purityName"))
  console.log(purityName)
  $scope.partyname=purityName[0].itemName
  //alert(purityName[0].itemName)
  $scope.staff=purityName[0].saleNames
  $scope.orderNo=purityName[0].orderNo
    $scope.userdi=purityName
    console.log($scope.userdi)
  // $http.get('/allDataOrders').success(function(response){
  //   $scope.userdi =response

  // })
     $http.get('/getmerchantdetails').success(function(response){
       console.log(response);
       $scope.Landmark =response[0].Address[0].Landmark;
       $scope.Street =response[0].Address[1].Street;
       $scope.Place =response[0].Address[2].Place;
       $scope.Phone =response[0].Address[3].Phone;
       $scope.Mobile =response[0].Address[4].Mobile;
       $scope.email =response[0].Address[5].email;

        $scope.ShopName =response[0].ShopName;

    })
}])//PdfCntrl ends here