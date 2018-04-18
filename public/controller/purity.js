var myApp=angular.module('myApp',[]); 
myApp.controller('PurityCntrl',['$scope','$http','$rootScope','$window',
function($scope,$http,$rootScope,$window){
$scope.all=true;
$scope.all1=true;
 $scope.usernamedetails = window.sessionStorage.getItem("username")
         
          if ($scope.usernamedetails == null) {
             //alert( $scope.usernamedetails);
              $window.location.href = "loginPage.html";
          };
  $scope.desgination = window.sessionStorage.getItem("desgination")

//$scope.Puritys = '';
//$scope.updatePurity = true;
$scope.updatePurity = false;
var updateCondition = false;
//alert(" Purity")
var PurityCall = function () {
	$http.get('/getPurityCount').success(function(PurityDetails){
	 	console.log(PurityDetails.length);
	 	var nextNo = PurityDetails.length +1;
	 	console.log(nextNo);
	 	
	 	$scope.NotationID = nextNo;
	 	
	 	$scope.PuritysDetails = PurityDetails;
	 })
}//PurityCall
PurityCall();
var invGroupIDCall = function () {
	$http.get('/getInvGroupIDCall').success(function(invGroupIDDetails){
	 	console.log(invGroupIDDetails);
	 	
	 	$scope.invGroupIDDetails = invGroupIDDetails;
	 })
}//invGroupIDCall
invGroupIDCall();
$scope.newPurity = function(){
	$scope.all=false;

}//$scope.newPurity
$scope.getInvGroupName = function(InvGroupID) {
	//alert(" InvGroupID "+InvGroupID)
  $http.get('/getInvGroupID',{params:{"InvGroupID":InvGroupID}}).success(function(InvGroup){
       // $scope.partyNames=response;
       console.log(InvGroup[0].InvGroupName);
       $scope.purity.InvGroupName = InvGroup[0].InvGroupName; 
        
  });
}

//var Purity = {};
$scope.validationPurity = function(NotationID,Purity){
	//validationPurity
	// Purity.PuritysCategoryNo = PuritysCategoryNo;
	// Purity.PuritysSortedOrderNo = PuritysSortedOrderNo;
	console.log(Purity);
	if (Purity == undefined) {
		alert(" Please Select Mandatory fields");
	}else if(Purity.InvGroupID == undefined ||Purity.InvGroupID == ''){
		alert(" Please enter InvGroupID");
	}else if(Purity.ValueNotation == undefined ||Purity.ValueNotation == ''){
		alert(" Please enter ValueNotation");
	}else if(Purity.ConversionPercentage == undefined ||Purity.ConversionPercentage == ''){
		alert(" Please enter ConversionPercentage");
	}else if(Purity.Rate == undefined ||Purity.Rate == ''){
		alert(" Please enter Rate");
	
	}else if ($scope.updatePurity == false){
		Purity.NotationID = NotationID;
	    
	   
		savePurity(Purity)
	}else if ($scope.updatePurity == true) {
		Purity.NotationID = NotationID;
	    updatePurity(Purity)
	};
	//if (Purity.name) designation{};
	//alert("savePurity ")

}//$scope.savePurity
var savePurity = function(Purity){
	//alert("save")
	console.log(Purity);
	 $http.post('/insertPurityDetails',Purity).success(function(responseDetails){
	 	$scope.purity= '';
	 	PurityCall();
	 	$scope.cancelPurity();
	 })

	
	//alert("savePurity ")

}//$scope.savePurity

$scope.editPurity = function(Purity){
	console.log(Purity._id); 
	 $scope.newPurity();
	 $scope.updatePurity = true;
	  $scope.purity = Purity;
	  $scope.NotationID = Purity.NotationID;
	 
}//$scope.editPurity

$scope.deletePurity = function(Purity){
	console.log(Purity._id);
	
	
		
	
			var r = confirm("Do you want to delete "+ Purity.ValueNotation)
			   if (r == true) {
			   		//alert("delete")
			   		$http.delete('/deletePurityDetails',{params:{_id:Purity._id}}).success(function(editPurityData){
			 	       //PurityCall();
			 	       $scope.cancelPurity();
			        })
			   }
	  
	 
	 
}//$scope.editPurity

var updatePurity = function(Purity){
		console.log(Purity)
		$http.post('/updatePurityDetails',Purity).success(function(responseDetails){
		 	$scope.purity= '';
		 	PurityCall();
		 	$scope.all=true;
		 	$scope.updatePurity = false;
			updateCondition = false;
	    })

	


}//$scope.updatePurity
$scope.cancelPurity = function(){

	$scope.all=true;
	$scope.updatePurity = false;
	updateCondition = false;
	$scope.purity = '';
	PurityCall();
	//invGroupIDCall();
	//alert("cancelPurity ")

}//$scope.cancelPurity

}])