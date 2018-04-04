var myApp=angular.module('myApp',[]); 
myApp.controller('inventoryGroupCntrl',['$scope','$http','$rootScope',
function($scope,$http,$rootScope){
$scope.all=true;
$scope.all1=true;
//$scope.InventoryGroups = '';
//$scope.updateinventoryGroupDetails = true;
$scope.updateinventoryGroupDetails = false;
var updateCondition = false;
//alert(" InventoryGroup")
var InventoryGroupCall = function () {
	$http.get('/getInventoryGroupCount').success(function(inventoryGroupDetails){
	 	console.log(inventoryGroupDetails.length);
	 	var nextNo = inventoryGroupDetails.length +1;
	 	// $scope.InventoryGroupsCategoryNo = nextNo;
	 	// $scope.InventoryGroupsSortedOrderNo = nextNo;
	 	// console.log($scope.InventoryGroupsCategoryNo);
	 	$scope.inventoryGroupsDetails = inventoryGroupDetails;
	 })
}//InventoryGroupCall
InventoryGroupCall();

$scope.newInventoryGroup = function(){
	$scope.all=false;

	//alert("newInventoryGroup ");
}//$scope.newInventoryGroup
//var InventoryGroup = {};
$scope.validationInventoryGroup = function(InventoryGroupsCategoryNo,InventoryGroupsSortedOrderNo,InventoryGroup){
	
	// InventoryGroup.InventoryGroupsCategoryNo = InventoryGroupsCategoryNo;
	// InventoryGroup.InventoryGroupsSortedOrderNo = InventoryGroupsSortedOrderNo;
	console.log(InventoryGroup);
	if (InventoryGroup == undefined) {
		alert(" Please Select Mandatory fields");
	}else if(InventoryGroup.InventoryGroupCategoryType == undefined ||InventoryGroup.InventoryGroupCategoryType == ''){
		alert(" Please enter InventoryGroupsCategoryType");
	}else if(InventoryGroup.PrnFileName == undefined ||InventoryGroup.PrnFileName == ''){
		alert(" Please enter PrnFileName");
	
	}else if ($scope.updateinventoryGroupDetails == false){
		InventoryGroup.InventoryGroupCategoryNo = InventoryGroupsCategoryNo;
	    InventoryGroup.SortedOrderNo = InventoryGroupsSortedOrderNo;
	   
		saveInventoryGroup(InventoryGroup)
	}else if ($scope.updateinventoryGroupDetails == true) {
		InventoryGroup.InventoryGroupCategoryNo = InventoryGroupsCategoryNo;
	    InventoryGroup.SortedOrderNo = InventoryGroupsSortedOrderNo;
		updateInventoryGroup(InventoryGroup)
	};
	//if (InventoryGroup.name) designation{};
	//alert("saveInventoryGroup ")

}//$scope.saveInventoryGroup
var saveInventoryGroup = function(InventoryGroup){
	//alert("save")
	console.log(InventoryGroup);
	 $http.post('/insertinventoryGroupDetails',InventoryGroup).success(function(responseDetails){
	 	$scope.InventoryGroup= '';
	 	InventoryGroupCall();

	 })

	
	//alert("saveInventoryGroup ")

}//$scope.saveInventoryGroup

$scope.editInventoryGroup = function(InventoryGroup){
	console.log(InventoryGroup._id); 
	 $scope.newInventoryGroup();
	 $scope.updateinventoryGroupDetails = true;
	 $http.get('/editinventoryGroupDetails',{params:{_id:InventoryGroup._id}}).success(function(editInventoryGroupData){
	 	//$scope.InventoryGroup = editInventoryGroupData[0];
	 	$scope.InventoryGroup = editInventoryGroupData[0];
	 	//$scope.InventoryGroup.PrnFileName = editInventoryGroupData[0].PrnFileName;
	 	$scope.InventoryGroupsCategoryNo = editInventoryGroupData[0].InventoryGroupCategoryNo;
	 	$scope.InventoryGroupsSortedOrderNo = editInventoryGroupData[0].SortedOrderNo;
	 	console.log(editInventoryGroupData[0])
	 	
	 })
}//$scope.editInventoryGroup

$scope.deleteInventoryGroup = function(InventoryGroup){
	console.log(InventoryGroup._id);
	
	
		
	
			var r = confirm("Do you want to delete "+ InventoryGroup.InventoryGroupCategoryType)
			   if (r == true) {
			   		//alert("delete")
			   		$http.delete('/deleteinventoryGroupDetails',{params:{_id:InventoryGroup._id}}).success(function(editInventoryGroupData){
			 	       InventoryGroupCall();
			        })
			   }
	  
	 
	 
}//$scope.editInventoryGroup

var updateInventoryGroup = function(InventoryGroup){
	
		$http.post('/updateinventoryGroupDetails',InventoryGroup).success(function(responseDetails){
		 	$scope.InventoryGroup= '';
		 	InventoryGroupCall();
		 	$scope.updateinventoryGroupDetails = false;
			updateCondition = false;
	    })

	


}//$scope.updateInventoryGroup
$scope.cancelInventoryGroup = function(){

	$scope.all=true;
	$scope.updateinventoryGroupDetails = false;
	updateCondition = false;
	$scope.InventoryGroupsCategoryNo = '';
	$scope.InventoryGroupsSortedOrderNo = '';
	$scope.InventoryGroup = '';
	InventoryGroupCall();
	//alert("cancelInventoryGroup ")

}//$scope.cancelInventoryGroup

}])