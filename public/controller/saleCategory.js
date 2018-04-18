var myApp=angular.module('myApp',[]); 
myApp.controller('saleCategoryCntrl',['$scope','$http','$rootScope','$window',
function($scope,$http,$rootScope,$window){
 $scope.usernamedetails = window.sessionStorage.getItem("username")
         
          if ($scope.usernamedetails == null) {
             //alert( $scope.usernamedetails);
              $window.location.href = "loginPage.html";
          };
  $scope.desgination = window.sessionStorage.getItem("desgination")

$scope.all=true;
$scope.all1=true;
//$scope.sales = '';
//$scope.updateSaleDetails = true;
$scope.updateSaleDetails = false;
var updateCondition = false;
//alert(" Sale")
var saleCategoryNumber = function () {
	$http.get('/getSaleCategoryCount').success(function(SaleDetails){
	 	console.log(SaleDetails.length);
	 	var nextNo = SaleDetails.length +1;
	 	$scope.salesCategoryNo = nextNo;
	 	$scope.salesSortedOrderNo = nextNo;
	 	console.log($scope.salesCategoryNo);
	 	$scope.salesCategoryDetails = SaleDetails;
	 })
}//saleCategoryNumber
saleCategoryNumber();

$scope.newSale = function(){
	$scope.all=false;

	//alert("newSale ");
}//$scope.newSale
//var Sale = {};
$scope.validationSale = function(salesCategoryNo,salesSortedOrderNo,Sale){
	
	// Sale.salesCategoryNo = salesCategoryNo;
	// Sale.salesSortedOrderNo = salesSortedOrderNo;
	console.log(Sale);
	if (Sale == undefined) {
		alert(" Please Select Mandatory fields");
	}else if(Sale.SaleCategoryType == undefined ||Sale.SaleCategoryType == ''){
		alert(" Please enter SalesCategoryType");
	}else if(Sale.PrnFileName == undefined ||Sale.PrnFileName == ''){
		alert(" Please enter PrnFileName");
	
	}else if ($scope.updateSaleDetails == false){
		Sale.SaleCategoryNo = salesCategoryNo;
	    Sale.SortedOrderNo = salesSortedOrderNo;
	   
		saveSale(Sale)
	}else if ($scope.updateSaleDetails == true) {
		Sale.SaleCategoryNo = salesCategoryNo;
	    Sale.SortedOrderNo = salesSortedOrderNo;
		updateSale(Sale)
	};
	//if (Sale.name) designation{};
	//alert("saveSale ")

}//$scope.saveSale
var saveSale = function(Sale){
	//alert("save")
	console.log(Sale);
	 $http.post('/insertSaleDetails',Sale).success(function(responseDetails){
	 	$scope.sale= '';
	 	saleCategoryNumber();

	 })

	
	//alert("saveSale ")

}//$scope.saveSale

$scope.editSale = function(Sale){
	console.log(Sale._id); 
	 $scope.newSale();
	 $scope.updateSaleDetails = true;
	 $http.get('/editSaleDetails',{params:{_id:Sale._id}}).success(function(editSaleData){
	 	//$scope.sale = editSaleData[0];
	 	$scope.sale = editSaleData[0];
	 	//$scope.sale.PrnFileName = editSaleData[0].PrnFileName;
	 	$scope.salesCategoryNo = editSaleData[0].SaleCategoryNo;
	 	$scope.salesSortedOrderNo = editSaleData[0].SortedOrderNo;
	 	console.log(editSaleData[0])
	 	
	 })
}//$scope.editSale

$scope.deleteSale = function(Sale){
	console.log(Sale._id);
	
	
		
	
			var r = confirm("Do you want to delete "+ Sale.SaleCategoryType)
			   if (r == true) {
			   		//alert("delete")
			   		$http.delete('/deleteSaleDetails',{params:{_id:Sale._id}}).success(function(editSaleData){
			 	       saleCategoryNumber();
			        })
			   }
	  
	 
	 
}//$scope.editSale

var updateSale = function(Sale){
	
		$http.post('/updateSaleDetails',Sale).success(function(responseDetails){
		 	$scope.sale= '';
		 	saleCategoryNumber();
		 	$scope.updateSaleDetails = false;
			updateCondition = false;
	    })

	


}//$scope.updateSale
$scope.cancelSale = function(){

	$scope.all=true;
	$scope.updateSaleDetails = false;
	updateCondition = false;
	$scope.salesCategoryNo = '';
	$scope.salesSortedOrderNo = '';
	$scope.sale = '';
	saleCategoryNumber();
	//alert("cancelSale ")

}//$scope.cancelSale

}])