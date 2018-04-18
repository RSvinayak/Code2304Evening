var myApp=angular.module('myApp',[]); 
myApp.controller('staffCntrl',['$scope','$http','$rootScope','$window',
function($scope,$http,$rootScope,$window){
 $scope.usernamedetails = window.sessionStorage.getItem("username")
         
          if ($scope.usernamedetails == null) {
             //alert( $scope.usernamedetails);
              $window.location.href = "loginPage.html";
          };
  $scope.desgination = window.sessionStorage.getItem("desgination")

$scope.all=true;
//$scope.updateStaffDetails = true;
$scope.updateStaffDetails = false;
var updateCondition = false;
//alert(" staff")
var savedStaffDetails = function() {
	 $http.get('/getSalesPerson').success(function(staffDetails){
	 	console.log(staffDetails);
	 	$scope.staffDetails = staffDetails;
	 })
            
	
}//savedStaffDetails
savedStaffDetails();
$scope.newStaff = function(){
	$scope.all=false;

	//alert("newStaff ");
}//$scope.newStaff
$scope.validationStaff = function(staff){
	
	console.log(staff);
	if (staff == undefined) {
		alert(" Please Select Mandatory fields");
	}else if(staff.name == undefined ||staff.name == ''){
		alert(" Please enter name");
	}else if(staff.password == undefined ||staff.password == ''){
		alert(" Please enter password");
	}else if(staff.desgination == undefined ){
		alert(" Please select designation");
	}else if ($scope.updateStaffDetails == false){
		saveStaff(staff)
	}else if ($scope.updateStaffDetails == true) {
		updateStaff(staff)
	};
	//if (staff.name) designation{};
	//alert("saveStaff ")

}//$scope.saveStaff
var saveStaff = function(staff){
	//alert("save")
	console.log(staff);
	 $http.post('/insertStaffDetails',staff).success(function(responseDetails){
	 	$scope.staff= '';
	 	savedStaffDetails();

	 })

	
	//alert("saveStaff ")

}//$scope.saveStaff

$scope.editStaff = function(staff){
	console.log(staff._id); 
	 $scope.newStaff();
	 $scope.updateStaffDetails = true;
	 $http.get('/editStaffDetails',{params:{_id:staff._id}}).success(function(editStaffData){
	 	$scope.staff = editStaffData[0];
	 	if (staff.desgination == 'Admin') {
			//alert("admin")
			$http.get('/adminStaffDetails').success(function(adminStaffData){
		 	     console.log(adminStaffData);
		 	     //alert(adminStaffData);
		 	     // if (adminStaffData>1) {
		 	     // 	alert(" ready to update")
		 	     // }else 
		 	     if (adminStaffData == 1 ){
		 	     	updateCondition = true;
		 	     	//alert(" ready to update with condition");

		 	     	//alert(" no updatre")
		 	     }
		 	     // else if (adminStaffData == 1 && editStaffData[0].desgination != 'Admin'){
		 	     // 	alert(" no updatre")
		 	     // }
		 	     //$scope.staff = editStaffData[0];
		 	
		    })
		}
	 	
	 })
}//$scope.editStaff

$scope.deleteStaff = function(staff){
	console.log(staff._id);
	if (staff.desgination == 'Admin') {
		//alert("admin call ");
		$http.get('/adminStaffDetails').success(function(adminStaffData){
		 	     console.log(adminStaffData);
		 	     
		 	     if (adminStaffData == 1 ){
		 	     	alert(" cannot delete when Admin is One")
		 	     }else{
		 	     	deleteCall()
		 	     }
		})
	}else{
		deleteCall()
	}
	function deleteCall() {
		
	
			var r = confirm("Do you want to delete "+ staff.name)
			   if (r == true) {
			   		//alert("delete")
			   		$http.delete('/deleteStaffDetails',{params:{_id:staff._id}}).success(function(editStaffData){
			 	       savedStaffDetails();
			        })
			   }
	}   
	 
	 
}//$scope.editStaff
$scope.designationCall = function(desgination){
	//aler
	if (desgination != 'Admin' && updateCondition == true) {
		alert(" cannot change designation Admin")
		$scope.staff.desgination = 'Admin';
	};

}//designationCall
var updateStaff = function(staff){
	console.log(staff._id);
	//alert(" update")
	// if (updateCondition == true) {
	// 	alert("admin")
	// 	if (staff.desgination != 'Admin'){
	// 		$scope.staff= '';
	// 		$scope.updateStaffDetails = false;
	// 		alert(" cannot change designation Admin")
	// 	}else{
	// 			alert(" update with con dition")
	// 			$http.post('/updateStaffDetails',staff).success(function(responseDetails){
	// 				 	$scope.staff= '';
	// 				 	$scope.updateStaffDetails = false;
	// 				 	updateCondition = false;
	// 				 	savedStaffDetails();
	// 	        })


	// 	     }
		
	// }else{
		$http.post('/updateStaffDetails',staff).success(function(responseDetails){
		 	$scope.staff= '';
		 	savedStaffDetails();
		 	$scope.updateStaffDetails = false;
			updateCondition = false;
	    })

	//}
	 
	//alert("updateStaff ")

}//$scope.updateStaff
$scope.cancelStaff = function(){

	$scope.all=true;
	$scope.updateStaffDetails = false;
	updateCondition = false;
	$scope.staff = '';
	//alert("cancelStaff ")

}//$scope.cancelStaff

}])