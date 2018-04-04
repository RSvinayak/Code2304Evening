 var myApp=angular.module('myApp',[]); 
myApp.controller('orderStatus',['$scope','$http','$window','$rootScope',"ControllerService",
function($scope,$http,$window,$rootScope,ControllerService){
	//alert("lllllllll")
	 $scope.results=[];

$scope.usernamedetails = window.sessionStorage.getItem("username")
	 $http.get("/orderName").success(function(response){
  console.log(response);
  $scope.ordertype=response;
  console.log($scope.ordertype)

})
   $scope.clearDataOrd=function(){
    $scope.results="";

   }
	 $scope.getorder=function(manage,datefrom,dateto){
  // var man=manage;
  // var dafrom=datefrom
  // var dato=dateto
  // alert(man)
  // alert(dafrom)
  // alert(dato)
  if(manage!=undefined && datefrom==undefined && dateto==undefined)
  {
    //alert("query for ordername")
  var prtys=manage;

   $http.get('/getord'+prtys).success(function(response){
             console.log(response)
             $scope.results=response;
              for(var i=0;i<response.length;i++){
             $scope.results[i].usedate = new Date(response[i].usedate )
  $scope.results[i].date = new Date(response[i].date )
               }
                if(response.length==0){
        alert("No Matches Found")
      }  
  
             console.log($scope.results)
               })
 }

 if(manage==undefined && datefrom!=undefined && dateto!=undefined)
  {

    //alert("query for date")
        var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
             both= fromdate+","+todate;
 

   $http.get('/getBothDates'+both).success(function(response){
             //console.log(response)
             $scope.results=response;
                       for(var i=0;i<response.length;i++){
             $scope.results[i].usedate = new Date(response[i].usedate )
  $scope.results[i].date = new Date(response[i].date )
               }
                if(response.length==0){
        alert("No Matches Found")
      }  
             console.log($scope.results)
               })
 }
 if(manage!=undefined && datefrom!=undefined && dateto!=undefined)
  {

    //alert("query for date and order")
        var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
             both= fromdate+","+todate+","+manage;
 //alert(both)

   $http.get('/DatesOrders'+both).success(function(response){
             //console.log(response)
             $scope.results=response;
     for(var i=0;i<response.length;i++){
             $scope.results[i].usedate = new Date(response[i].usedate )
  $scope.results[i].date = new Date(response[i].date )
               }
                if(response.length==0){
        alert("No Matches Found")
      }  
               })
 }
 else if(manage==undefined && datefrom==undefined && dateto==undefined){
  alert("Please Select Mandatory Fields")
 }


 }
  $scope.rowSelect = function(tag,index){
  //alert($scope.makeDisabled)
 $scope.makeDisabled=tag.initial
  $scope.rowSelected = index
  //alert(selectedrow)
  $scope.idSelected = tag;
  console.log($scope.idSelected)
}
$scope.gotoorders=function(data) {
 //alert( $scope.rowSelected)
  if ($scope.typeorder==undefined && $scope.datefrom==undefined &&$scope.dateto==undefined){
    alert("Please Select Mandatory Fields")
    return;
  }
  else if($scope.rowSelected==undefined){
    alert("Please Select  Data")
    return;
  }
  else{
   
     window.location.href = "orderCustomer.html";
    window.sessionStorage.setItem("gotoorders",JSON.stringify($scope.idSelected))
  window.sessionStorage.setItem("bringOrders","updateData")
  }
    //var id= $scope.idSelected._id
   // console.log(id)
   //alert( $scope.dataselect)
   

// $http.get('/goorders',{params:{"id":$scope.idSelected._id}}).success(function(response){
//              console.log(response)

//                $scope.userit=response;

//              // console.log($scope.userit)
//                })
    
 
 }
  $scope.valuationPrint = function(){
            //alert("vadskjdrfjk");
             const timeoutSendData = setTimeout(() => {
                           // res.json(printfinalary);
                          // sendResponseInsert() 
             $window.location.href = "pdf.html"; 
                         }, 500);
       }
 }])