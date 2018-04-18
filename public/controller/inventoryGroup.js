var myApp=angular.module('myApp',[]); 
myApp.controller('inventoryGroupCntrl',['$scope','$http','$rootScope','$window',
function($scope,$http,$rootScope,$window){
 $scope.usernamedetails = window.sessionStorage.getItem("username")
         
          if ($scope.usernamedetails == null) {
             //alert( $scope.usernamedetails);
              $window.location.href = "loginPage.html";
          };
  $scope.desgination = window.sessionStorage.getItem("desgination")

$scope.all=true;
$scope.all1=true;
//$scope.InventoryGroups = '';
//$scope.updateInventoryGroupDetails = true;
$scope.updateInventoryGroupDetails = false;
var updateCondition = false;
//alert(" InventoryGroup")
var InventoryGroupCall = function () {
	$http.get('/getInventoryGroupCount').success(function(inventoryGroupDetails){
	 	console.log(inventoryGroupDetails.length);
	 	var nextNo = inventoryGroupDetails.length +1;
	 	console.log(nextNo);
	 	
	 	$scope.SortOrder = nextNo;
	 	$scope.invGroupID = nextNo;
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
$scope.validationInventoryGroup = function(InventoryGroupId,InventoryGroupSortedOrderNo,InventoryGroup,InventoryGroupAccounts){
	console.log(InventoryGroupAccounts);
	 console.log(InventoryGroupAccounts[0].PurchaseAcc);
	 	console.log(InventoryGroup);
	 	var PurchaseAcc = [];
	 	var SalesAcc = [];
	 	for(len = 0;len<InventoryGroupAccounts.length;len++){
	 		 console.log(InventoryGroupAccounts[len].PurchaseAcc);
	 		 if (InventoryGroupAccounts[len].PurchaseAcc!= undefined) {
		 		PurchaseAcc.push({
		 		    "AccId":InventoryGroupAccounts[len].PurchaseAcc.AccId,
		 		     "AccNo":InventoryGroupAccounts[len].PurchaseAcc.AccNo
		 	    })	
	 		};
	 		if (InventoryGroupAccounts[len].SalesAcc!= undefined) {
		 		SalesAcc.push({
		 		    "AccId":InventoryGroupAccounts[len].SalesAcc.AccId,
		 		     "AccNo":InventoryGroupAccounts[len].SalesAcc.AccNo
		 	     })
	 		};
	 	}
	 	
	if (InventoryGroup == undefined) {
		alert(" Please Select Mandatory fields");
	}else if(InventoryGroup.InvGroupName == undefined ||InventoryGroup.InvGroupName == ''){
		alert(" Please enter InvGroupName");
	}else if(InventoryGroup.Alias == undefined ||InventoryGroup.Alias == ''){
		alert(" Please enter Alias");
	
	}else if(PurchaseAcc[0] == undefined ||PurchaseAcc[0].AccId == undefined || PurchaseAcc[0].AccId == ''){
		alert(" Please enter PurchaseAccId");
	}else if(PurchaseAcc[0].AccNo == undefined ||PurchaseAcc[0].AccNo == ''){
		alert(" Please enter PurchaseAccNo");
	}else if(SalesAcc[0] == undefined ||SalesAcc[0].AccId == undefined ||SalesAcc[0].AccId == ''){
		alert(" Please enter SalesAccId");
	}else if(SalesAcc[0].AccNo == undefined ||SalesAcc[0].AccNo == ''){
		alert(" Please enter SalesAccNo");
	}else if ($scope.updateInventoryGroupDetails == false){
		
		InventoryGroup.InvGroupID = InventoryGroupId;
	    InventoryGroup.sortOrder = InventoryGroupSortedOrderNo;
	   InventoryGroup.PurchaseAcc = PurchaseAcc;
	      InventoryGroup.SalesAcc = SalesAcc;
	  
	   console.log(InventoryGroup);
		saveInventoryGroup(InventoryGroup)
	}else if ($scope.updateInventoryGroupDetails == true) {
		//alert(" update call ")
		InventoryGroup.InvGroupID = InventoryGroupId;
	    InventoryGroup.sortOrder = InventoryGroupSortedOrderNo;
	   InventoryGroup.PurchaseAcc = PurchaseAcc;
	      InventoryGroup.SalesAcc = SalesAcc;
	   console.log(InventoryGroup);
	    updateInventoryGroup(InventoryGroup)
	};
	//if (InventoryGroup.name) designation{};
	//alert("saveInventoryGroup ")

}//$scope.saveInventoryGroup
var saveInventoryGroup = function(InventoryGroup){
	//alert("save")
	console.log(InventoryGroup);
	 $http.post('/insertinventoryGroupDetails',InventoryGroup).success(function(responseDetails){
	 	// $scope.InventoryGroup= '';
	 	// InventoryGroupCall();
	 	$scope.cancelInventoryGroup();
	 })

	
	//alert("saveInventoryGroup ")

}//$scope.saveInventoryGroup

$scope.editInventoryGroup = function(InventoryGroup){
	console.log(InventoryGroup.PurchaseAcc.length); 
	 $scope.newInventoryGroup();
	 $scope.updateInventoryGroupDetails = true;
	 $scope.InventoryGroup = InventoryGroup;
  	 $scope.invGroupID = InventoryGroup.InvGroupID;
 	 $scope.SortOrder = InventoryGroup.sortOrder;
	

	 
// 	 InventoryGs[0] = {};
// 	  InventoryGs[0].PurchaseAcc= {'AccId':'adds','AccNo' :"accNo"}
// InventoryGs[1] = {};
// 	   InventoryGs[1].PurchaseAcc= {'AccId':'adds','AccNo' :"accNo"}
	 // 	PurchaseAcc.push({
		 	// 	    "AccId":InventoryGroupAccounts[len].PurchaseAcc.AccId,
		 	// 	     "AccNo":InventoryGroupAccounts[len].PurchaseAcc.AccNo
		 	//     })
	  // [{'AccId':'adds','AccNo' :"accNo"},{'AccId':'adds','AccNo' :"accNo"}]
	 // InventoryGs[0].PurchaseAcc.AccId = "adds";
	 // InventoryGs[0].PurchaseAcc.AccNo = "accNo";
	 // var PurchaseAcc = [];
	 // 	var SalesAcc = [];
	 var   InventoryGs = []
	      //InventoryGs[0] = {};
	 	for(len = 0;len<InventoryGroup.PurchaseAcc.length;len++){
	 		 //console.log(InventoryGroupAccounts[len].PurchaseAcc);
	 		 //if (InventoryGroupAccounts[len].PurchaseAcc!= undefined) {
		 			// InventoryGs[0] = {};
		 			InventoryGs[len] = {};
	                InventoryGs[len].PurchaseAcc= {'AccId':InventoryGroup.PurchaseAcc[len].AccId,
	                                'AccNo' :InventoryGroup.PurchaseAcc[len].AccNo}
	                                		 		//	InventoryGs[len] = {};
	                InventoryGs[len].SalesAcc= {'AccId':InventoryGroup.SalesAcc[len].AccId,
	                                'AccNo' :InventoryGroup.SalesAcc[len].AccNo}


//InventoryGs[1] = {};
	  // InventoryGs[1].PurchaseAcc= {'AccId':'adds','AccNo' :"accNo"}
	
		 	// 	InventoryGs[0].PurchaseAcc[len] = []
		 	// InventoryGs[0].PurchaseAcc[len].push({
		 	// 	    "AccId":InventoryGroup.PurchaseAcc[len].AccId,
		 	// 	     "AccNo":InventoryGroup.PurchaseAcc[len].AccNo
		 	//     })
		 	    console.log(InventoryGs); 
	 //[{'AccId':'adds','AccNo' :"accNo"},{'AccId':'adds','AccNo' :"accNo"}]
	  $scope.InventoryGroupAccounts =  InventoryGs;	
	 		//};
	 		// if (InventoryGroupAccounts[len].SalesAcc!= undefined) {
		 	// 	SalesAcc.push({
		 	// 	    "AccId":InventoryGroupAccounts[len].SalesAcc.AccId,
		 	// 	     "AccNo":InventoryGroupAccounts[len].SalesAcc.AccNo
		 	//      })
	 		// };
	 	}
	 // console.log(InventoryGs); 
	 // //[{'AccId':'adds','AccNo' :"accNo"},{'AccId':'adds','AccNo' :"accNo"}]
	 //  $scope.InventoryGroupAccounts =  InventoryGs;
	 // console.log($scope.InventoryGroupAccounts); 
	 // console.log($scope.InventoryGroupAccounts.PurchaseAcc[0].AccId);
			 // if (InventoryGroupAccounts[len].PurchaseAcc!= undefined) {
		 	// 	PurchaseAcc.push({
		 	// 	    "AccId":InventoryGroupAccounts[len].PurchaseAcc.AccId,
		 	// 	     "AccNo":InventoryGroupAccounts[len].PurchaseAcc.AccNo
		 	//     })	
	 		// };
	 // $http.get('/editinventoryGroupDetails',{params:{_id:InventoryGroup._id}}).success(function(editInventoryGroupData){
	 	
	 // 	$scope.InventoryGroup = editInventoryGroupData[0];
	 // 	$scope.invGroupID = editInventoryGroupData[0].InvGroupID;
	 // 	$scope.SortOrder = editInventoryGroupData[0].sortOrder;
	 // //	$scope.InventoryGroupAccounts = editInventoryGroupData[0].Accounts;
	 // 	console.log(editInventoryGroupData[0].Accounts)
	 	
	 // })
}//$scope.editInventoryGroup

$scope.deleteInventoryGroup = function(InventoryGroup){
	console.log(InventoryGroup._id);
	
	
		
	
			var r = confirm("Do you want to delete "+ InventoryGroup.InvGroupName)
			   if (r == true) {
			   		//alert("delete")
			   		$http.delete('/deleteinventoryGroupDetails',{params:{_id:InventoryGroup._id}}).success(function(editInventoryGroupData){
			 	       //InventoryGroupCall();
			 	       $scope.cancelInventoryGroup();
			        })
			   }
	  
	 
	 
}//$scope.editInventoryGroup

var updateInventoryGroup = function(InventoryGroup){
	
		$http.post('/updateInventoryGroupDetails',InventoryGroup).success(function(responseDetails){

	 	   $scope.cancelInventoryGroup();
	    })

	


}//$scope.updateInventoryGroup
$scope.cancelInventoryGroup = function(){

	$scope.all=true;
	$scope.updateInventoryGroupDetails = false;
	updateCondition = false;
	$scope.invGroupID = '';
	$scope.SortOrder = '';
	$scope.InventoryGroup = '';
	InventoryGroupCall();
	$scope.InventoryGroupAccounts = [];
	$scope.InventoryGroupAccounts[0] = {};
	//alert("cancelInventoryGroup ")

}//$scope.cancelInventoryGroup
$scope.InventoryGroupAccounts = [];
$scope.InventoryGroupAccounts[0] = {};
//$scope.InventoryGroupAccounts[0].AccId = '';
$scope.addrow1 = function(){

  console.log('addrow1')  

 $scope.InventoryGroupAccounts.push({
 
 'PurchaseAccId':"",
 
})
//add1()
}

}])