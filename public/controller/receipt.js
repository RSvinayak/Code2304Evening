//new controller for receipt pdf
var myApp=angular.module('myApp',[]);
myApp.controller('billCntrl',['$scope','$http','$window',
  function($scope,$http,$window){

 $scope.usernamedetails = window.sessionStorage.getItem("username")
         
          if ($scope.usernamedetails == null) {
             //alert( $scope.usernamedetails);
              $window.location.href = "loginPage.html";
          };
  $scope.desgination = window.sessionStorage.getItem("desgination")
 // $scope.name="shivu";
 $scope.rpamt=[];
 $scope.paymode='Cash';
 $scope.dates=new Date();
  // 2222222222222222222
 // $scope.billNo="RP1";
 $scope.trans="Receipt";
 var setPatyName="null"
 // $scope.totals=50000;

 $scope.customer=JSON.parse(window.sessionStorage.getItem("partyname"));
 $scope.billtype=window.sessionStorage.getItem("Billtype");
 $scope.printreceipt=window.sessionStorage.getItem("rprint");
 var recentId=JSON.parse(window.sessionStorage.getItem("siid"));
 var recentId1=recentId;
 $scope.newAdd= JSON.parse(window.sessionStorage.getItem("addAmt"));
   //alert(recentId1+"  bbbbbbbbbbbbbb");
    //alert("selected party"+$scope.printreceipt);
 $scope.partyname=$scope.customer;
   // alert("partyname"+$scope.partyname);
 console.log("selected party"+$scope.customer);
         $http.get('/cash').success(function(response){
          console.log(response);
          $scope.modes=response;
          //alert($scope.items);
    });

//for getting all bills based on partyname 6/4/18
      // $http.get('/allPaidBills'+$scope.partyname).success(function(response){
      //   console.log(response);
      // })
         $http.get('/getRecentVoucherNo'+recentId1).success(function(response){
          console.log(response);
          $scope.vno=response[0].voucherNo;
           //alert("selected voucherNo  "+  $scope.vno);
         })
         if($scope.customer==null){
            // alert("hiiiiiiiiiiiiiiiiiiiiiiiiii");
         $http.get('/partynames'+$scope.trans).success(function(response){
          $scope.partynames=response;
          // alert($scope.partynames+"partynames");
         });
          }
          else{

            $scope.partyname=$scope.customer;
            var pname=$scope.partyname;
   $http.get('/getvoucherids'+pname).success(function(response){
     // alert("got voucherno");
     console.log(response);
    // $scope.alldetails=response;
    //alert("ll"+response.length);
    for(var i=0;i<=response.length-1;i++){
       // alert("with in for");
      console.log($scope.vno);
      console.log("iii"+i);
      //alert(response[i].voucherNo);
      if($scope.vno == response[i].voucherNo){
         //alert("with in if"+i);
        // $scope.idSelectedVote=i;
            $scope.row3(i);
           console.log($scope.vno+"22222222222222222222");
         $http.get('/getvoucherAmount'+$scope.vno).success(function(response){
            console.log(response);
            console.log(response[0].netamt);
            // $scope.selectedAmount=response[0].netamt;
              $scope.storeVoucher(i,$scope.vno,response[0].netamt)
         });
        // $scope.storeVoucher();
        // document.getElementById("tag1").onclick()
      }//if
    }//for
    // $scope.details=response;
          if(recentId1 == null){
      // alert("recentID1 is null");
              $scope.details=response;
          }
          else{
            // alert("when recentId is not null");
            $http.get('/getOnlyRecentData'+$scope.vno).success(function(response){
              console.log(response);
              $scope.details=response;
            })
          }//else



  })
}//else

        $http.get('/bank').success(function(response){
        $scope.banks=response;
        //alert($scope.items);
    });
        $http.get('/cards').success(function(response){
          $scope.cards=response;
        })

//for generating billno
$http.get('/getprefixs').success(function(response){
  console.log(response);
  console.log(response[0].TransactionPrefix)
  $scope.prefix1=response[0].TransactionPrefix;
  $http.get('/gettotalcount').success(function(response){
    console.log(response);
    $scope.bno=response+1;
    $scope.billNo=$scope.prefix1+$scope.bno;
    $scope.BillNos=$scope.prefix1+","+$scope.bno;
    $scope.narrate="Receipt No is :"+$scope.billNo;
      window.sessionStorage.setItem("billnumber",$scope.billNo);
  // alert($scope.billNo);
  // $scope.insertReceipt($scope.billNo);
  })

})

setPatyName  =  window.sessionStorage.getItem("receiptPatyName");
 
console.log(setPatyName)
//setPatyName = 'viin';
if (setPatyName!="null" && setPatyName!=null) {
//alert("KK")
$scope.dataHide="yes"
 var str=setPatyName;
 //   // console.log(str);
     var str_array=str.split(",");
    var a =str_array[0];
    //console.log("status is"+status);
    var c=str_array[1]
    console.log(" a "+a);
    console.log(" c "+c);
    $scope.orderNO=str_array[1];
        //$scope.orderNO=response[0].orderNO;
        $scope.partyname=str_array[0];
    //   $http.get('/receiptOrderNo/'+setPatyName).success(function(response){
    //       console.log(response);
    //     $scope.orderNO=response[0].orderNO;
    //     //$scope.orderNO=response[0].orderNO;
    //     $scope.partyname=response[0].partyNames
       
    // });


}   
window.sessionStorage.setItem("receiptPatyName","null");

            var ilchgg  = window.sessionStorage.getItem("receiptPatyName");



  //for adding focus to selected row
  var editrow3 = null;
$scope.row3 = function(rowno){
    // alert("clicked");
   console.log("this is row id"+rowno);
     //alert("this is row id"+rowno);
  console.log("u clicked on row"+rowno);
  $scope.idSelectedVote = rowno;
   console.log(rowno);
   editrow3 = rowno;
   // var editrow3=null;
}

var editrow4=null;
$scope.row4 = function(rowno){
  console.log("this is row id"+rowno);
  $scope.idSelectedVotes = rowno;
  console.log(rowno);
  editrow4=rowno;
}

//function for saving voucherno
$scope.storeVoucher=function(index,voucher,net){
    //alert(index+"bbbbbbbbbb"+voucher);
  

  $scope.voucherId=voucher;
  $scope.selectedAmount = net;
  //$scope.net=net;
  $http.get('/getRecepietData'+voucher).success(function(response){
    console.log(response);
    $scope.receiptData = response;
    // for (var i = Things.length - 1; i >= 0; i--) {
    //   Things[i]
    // };
    var receiptDataAmount = null;
    for(var receiptDataLength = response.length - 1;receiptDataLength >= 0; receiptDataLength-- ){
       console.log(response[receiptDataLength].Amount.$numberDecimal);
       receiptDataAmount += parseFloat(response[receiptDataLength].Amount.$numberDecimal)
       console.log(receiptDataAmount);
        $scope.selectedAmount = net - receiptDataAmount;
        console.log($scope.selectedAmount);
    }
    // console.log(response[0].PaidAmount[0].$numberDecimal);
  
  })


}

        //new function for getting voucher based on partyname
$scope.getVouchers=function(party){
   // alert(party+"partyname");
  var pname=party;
  $http.get('/getvoucherids'+pname).success(function(response){
    console.log(response);
    $scope.details=response;
  })
  $http.get('/allPaidBills'+pname).success(function(response){
        console.log(response);
        $scope.receiptData=response;
      })

}

 //clear()
$scope.clear=function(){
  
      if($scope.rpamt.length == 0){
      if($scope.printreceipt==1){
      window.location.href="pdf.html";
      }
      else{
        alert("only if navigated through transaction page");
      }
    }
    else{
      alert("remove all mode you have entered");
    }
}

//for total amount Calculation
 $scope.total1=0;

$scope.totalAmount=function(data){
   // alert("amount"+data);
 $scope.total1=0;
 $scope.totals=0;
 for(i=0;i<=$scope.rpamt.length-1;i++){
    $scope.total1 += $scope.rpamt[i].amount;
  //  $scope.total1 += $scope.rpamt[$index].amount;
  // alert($scope.total1);
}
 $scope.totals = $scope.total1;
 // window.sessionStorage.setItem('tamount',$scope.totals);
}

$scope.newRow=function(){
  if(($scope.partyname != null)|| $scope.newAdd == 1){
        $scope.rpamt.push({
          'paymode':"",
          'amount':"",
          'bank':"",
          'chequeno':"",
          'dates':"",
          'cardnos':"",
          'ctype':"",
          'appno':""
        
        })
    }//i
}

$scope.billDate=new Date();
   //for inserting values into collection

  $scope.save=function(){

    console.log($scope.rpamt);
    var flag=0;
console.log($scope.paymode+","+$scope.amount+","+$scope.bank+","+$scope.chequeno+","+
  $scope.date+","+$scope.cardnos+","+$scope.ctype+","+$scope.appno);
    // alert("tahnks for validating");
    if(flag==0){
      if($scope.partyname==undefined){
        alert("please select partyname")
        flag=1;
        return;
      }
      if($scope.rpamt.length==0){
        alert("please click on Addnew and enter Mandatory fileds");
      }
      else{
        for(i=0;i<=$scope.rpamt.length-1;i++){
          if($scope.rpamt[i].paymode==undefined||$scope.rpamt[i].paymode==""){
            alert("please select Mode");
            flag=1;
            return;
          }
          // alert($scope.paymode)
          if($scope.rpamt[i].amount==undefined||$scope.rpamt[i].amount==""){
            alert("please enter the amount");
            flag=1;
            return;
          }
       if($scope.rpamt[i].paymode!='Cash'){
          if($scope.rpamt[i].bank==undefined || $scope.rpamt[i].bank==""){
            alert("please select the bank");
            flag=1;
            return;
          }
        }
          if($scope.rpamt[i].paymode=='Cheque'){
              if($scope.rpamt[i].chequeno==undefined){
                alert("please enter the cheque no");
                flag=1;
                return;
              }
              else{
               // alert("cheque no validation22");
                var cheno = $scope.rpamt[i].chequeno;
                var chebank = $scope.rpamt[i].bank;
                var chedata=cheno+","+chebank;
                // alert(chedata)
                $http.get('/checknovalidation'+chedata).success(function(response){
                  console.log(response);
                   // alert(response+"333333333333333");
                  if(response.length != 0){
                     alert("Entered Cheque No already exists");
                    $scope.chequeno='';
                    flag=1;
                      // alert("flag with in res"+flag);
                     return;
                    // break;

                  }
                  
                });
            }
          if($scope.rpamt[i].date==undefined||$scope.rpamt[i].date==""){
            alert("please enter the date");
            flag=1;
            return;
          }

            if($scope.rpamt[i].date != undefined){
             var entereddate=$scope.rpamt[i].date;
            var dateentered=entereddate.setDate(entereddate.getDate());
            var newdate=new Date();
           var maxdate=  newdate.setDate(newdate.getDate() + 89);

            if (maxdate > dateentered) {
              // alert("Entered cheque date is with in 90 days");
              console.log("Entered cheque date is with in 90 days");
             // The selected time is less than 30 days from now

              }
              else {
                  // The selected time is more than 30 days from now
                  alert("Entered cheque date is not with in 90 days");
                  flag=1;
                  return;
              }
              
            }



         }
          if($scope.rpamt[i].paymode=='Card'){
                if($scope.rpamt[i].cardnos==undefined||$scope.rpamt[i].cardnos==""){
                  alert("please enter the card no");
                  flag=1;
                  return;
                }
                if($scope.rpamt[i].ctype==undefined||$scope.rpamt[i].ctype==""){
                  alert("please enter the card type");
                  flag=1;
                  return;
                }
                if($scope.rpamt[i].appno==undefined||$scope.rpamt[i].appno==""){
                  alert("please enter the approval number");
                  flag=1;
                  return;
                }
          }

          if(i==$scope.rpamt.length-1){
            // if($scope.transaction=="Regular Sale"||$scope.transaction=='RD Purchase'||$scope.transaction=='Approval Sale'){
            if( $scope.selectedAmount == $scope.totals){
              alert("complete amount is paid");
               $scope.voucherStatus = 'completed';
              postVoucherStatus();
            }
            else if( $scope.totals>$scope.selectedAmount){
               alert(($scope.totals - $scope.selectedAmount)+"  amount is paid more than the invoiceamount");
                $scope.voucherStatus = 'completed';
               postVoucherStatus();

            }
            else if (setPatyName=="null"){
               alert(($scope.selectedAmount - $scope.totals)+"  amount is paid less then the invoiceamount");
                $scope.voucherStatus = 'InProgress';
            }
          // }//if
           //start for save and navigation
     if (setPatyName!="null" && setPatyName!= null) {
             // alert("llll")
                 setTimeout(function(){$scope.insertReceiptOrders(flag)},500);
           }else
           {
              // alert("hi");
                 setTimeout(function(){$scope.insertReceipt(flag)},500);
                }        //end for save and navigation    
          }
          
        }//for loop
      }//else
       
    }//if 
console.log($scope.rpamt.paymode+","+$scope.rpamt.amount+","+$scope.rpamt.bank+","+$scope.rpamt.chequeno+","+
  $scope.rpamt.date+","+$scope.rpamt.cardnos+","+$scope.rpamt.ctype+","+$scope.rpamt.appno+",+");
   }//main()
   postVoucherStatus = function(){
     //alert("postVoucherStatus "+$scope.voucherId);
     $http.post('/AccountStatusReceipt'+$scope.voucherId).success(function(response){
            console.log(response);
            // if(response.length!=0){
              
            // }
     })


   }
   //for inserting data to db
   $scope.insertReceipt=function(flag){

      //$scope.voucherStatus = 'InProgress';
      if(flag==0){
      for(i=0;i<=$scope.rpamt.length-1;i++){

      $scope.rdata=$scope.rpamt[i].paymode+","+$scope.rpamt[i].amount+","+$scope.rpamt[i].bank+","+$scope.rpamt[i].chequeno+","+$scope.rpamt[i].date+","+$scope.rpamt[i].cardnos+","+$scope.rpamt[i].ctype+","+$scope.rpamt[i].appno+","+$scope.partyname+","+$scope.billDate+","+$scope.billNo+
      
      ","+$scope.narrate+","+$scope.totals+","+$scope.voucherId+","+$scope.voucherStatus+","+$scope.selectedAmount+","+$scope.orderNO;
      // alert($scope.rdata);
      console.log($scope.rdata)
      $http.post('/receiptdata/'+$scope.rdata).success(function(response){
        // alert("called server");
        console.log(response);
        if(response.lenght!=0){
          // location.reload();
          //alert($scope.BillNos+"dddddddddddddddddd");
                $http.put('/insertbill'+$scope.BillNos).success(function(response){
                  console.log(response);
                        if(response.length!=0){
                          if($scope.printreceipt==0){

                                 // alert("hi");
                             window.location.href = 'receiptpdf.html';
                            }
        
                            else{
// window.sessionStorage.setItem("typebill",$scope.billtype);
                                    window.sessionStorage.setItem("billnumber",$scope.billNo);
                                   window.location.href = 'pdf.html';
                                  }//else
                        }//if
                })//httpput
         }//if
        })//post
     }//for
   }//if
 }//  $scope.insertReceipt
   $scope.insertReceiptOrders=function(flag){
     // alert("clicked on save"+$scope.printreceipt);
      //$scope.voucherStatus = 'InProgress';
if (setPatyName!="null" && setPatyName!=null) {

                                    var go=confirm("Material Advance");
                                    if(go==true){

                                          $scope.transaction="Receipt Voucher"       
                                          window.location = "Transaction.html";
                                          window.sessionStorage.setItem("orderGetReceipt",$scope.transaction)
                                          window.sessionStorage.setItem("getPatyName",$scope.partyname)
                                          window.sessionStorage.setItem("getOrderNo",$scope.orderNO)


                              
                                    }else{
                   
                                             window.location="orderMaking.html"
                                             
                                         }

                                }//if (setPatyName!="null")
                        
            
      if(flag==0){

        // commented on 29/3/vijay to work billno
        // if($scope.orderNO!=undefined){
        //   $scope.billNo=null;
        // }

     
      for(i=0;i<=$scope.rpamt.length-1;i++){

      $scope.rdata=$scope.rpamt[i].paymode+","+$scope.rpamt[i].amount+","+$scope.rpamt[i].bank+","+$scope.rpamt[i].chequeno+","+$scope.rpamt[i].date+","+$scope.rpamt[i].cardnos+","+$scope.rpamt[i].ctype+","+$scope.rpamt[i].appno+","+$scope.partyname+","+$scope.billDate+","+$scope.billNo+
      
      ","+$scope.narrate+","+$scope.totals+","+$scope.voucherId+","+$scope.voucherStatus+","+$scope.selectedAmount+","+$scope.orderNO;
      // alert($scope.rdata);
      console.log($scope.rdata)
        // 
        $http.post('/receiptdata/'+$scope.rdata).success(function(response){
                // alert("called server");
                console.log(response);
              
        })//post
     }//for
      $scope.dataDetails = $scope.partyname+","+$scope.orderNO
      $http.post('/api/orderDetailsAmontAdvancePdf/'+$scope.dataDetails)
      
   }//if
 }//  $scope.insertReceipt
window.sessionStorage.setItem("rprint",0);
window.sessionStorage.setItem("Billtype",null);
window.sessionStorage.setItem("partyname",null);
window.sessionStorage.setItem($scope.recentId,null);
window.sessionStorage.setItem("siid",null);

window.sessionStorage.setItem("receiptPatyName",null);

// window.sessionStorage.removeItem('Billtype');
// window.sessionStorage.setItem("partyn",null);
    // $scope.printreceipt=0;
//for deletion
$scope.indexSelected=[];
$scope.check=0;
$scope.indexFunctionCall=function(index,vname) {

           if ($scope.indexSelected.indexOf(index) == -1){
                $scope.indexSelected.push(index);
                // alert(index+"pushed index");
            }
                     
         console.log($scope.indexSelected)
}
$scope.removeChecked = function(index,vname) {
  // alert(index+"clicked on checkbox"+vname);
  if(vname==1){
    // alert("checkbox checked"+index); 
  $scope.rpamt[index].index = index;
  console.log($scope.rpamt);
  }//if
 
    else{
      console.log($scope.rpamt);
         for(var i=0;i<=$scope.indexSelected.length-1;i++){
           // alert("checkbox is unchecked"+index);
              if (  $scope.rpamt[i].index === index) {
                 // alert("within if");
                delete $scope.rpamt[i].index;
                // $scope.checkbox=$scope.checkbox-1;
                delete($scope.indexSelected[i]);
                console.log($scope.indexSelected);
                console.log($scope.rpamt);
               
              }  //if
       
          }//for
    }//else
}//removeChecked//removeChecked


$scope.removeSelectedRows = function() {
  // alert(indexs+"fffffffffffffff");
  var a =0;
   $scope.rpamt1 = [];
    if (0 == $scope.rpamt.length) {
                       // do stuff
        alert("Please Fill Necessary Details");
        return;
      }
      else if($scope.indexSelected=="" ||$scope.indexSelected==undefined||$scope.indexSelected==null){
        alert("Please Select Checkbox")

      }
      else{

    var r = confirm("Are you sure you want to delete this ?")
            if (r==true) {
                
  // alert(" got call  $scope.userit.length "+ $scope.userit.length);
           for(let i=0;i<=$scope.rpamt.length-1;i++){ 
              
              if ($scope.rpamt[i].index != undefined) {
                           // alert(" iam hsdfsdf undefine unsaved "+ $scope.rpamt[i].index);
                      console.log($scope.rpamt[i]);
                      $scope.rpamt.splice(i,1);
                      console.log($scope.rpamt)
                     
                   } 
              // }else{
              //            // alert("saved");
              //          console.log($scope.rpamt[i]);
              //     $scope.rpamt.splice(i,1);
              //          // saleInvoiceCalculations();
              //          // $scope.rpamt1[a] = $scope.rpamt[i];
              //          // a++;
              //           // console.log($scope.rpamt1);
              // }
             $scope.totalAmount();
            }//for
          }//if(r==true);
          
        }//else
}//trial
// $scope.rePrint=function(index,bno){
//    // alert(index+"fffff"+bno);
//   $scope.billid=bno;
// }
//reprinting method
$scope.rePrint=function(index,bno,modes,amts){
  // $scope.name="vinnu"
   // alert(index+"fffff"+bno);
  $scope.billid=bno;
  window.sessionStorage.setItem("rbill",$scope.billid);
  $scope.smode=modes;
  // window.sessionStorage.setItem("")
  $scope.samount=amts;
}

$scope.rePrinting=function(){
  // $scope.name="vinnu"
   // alert($scope.billid+","+$scope.smode+","+$scope.samount);
  // console.log($scope.billid+"id id id"+$scope.samount);
  // $scope.datasearch=$scope.billid+","+$scope.smode+","+$scope.samount;
  $http.get('/reprintdata'+$scope.billid).success(function(response){
    console.log(response);
    $scope.datareprint=response;
 // alert($scope.datareprint);
 console.log($scope.datareprint);
 window.sessionStorage.setItem("res",JSON.stringify($scope.datareprint));
  // alert(response+"var")
// });
  // numberwords(response[0].Amount.$numberDecimal);
    // $scope.totalAmts=response[0].Amount.$numberDecimal;
    // // $scope.totalAmts="shivu"
    // console.log($scope.totalAmts);
    // $scope.reprintBillNo=response[0].BillNo;
    // console.log($scope.reprintBillNo);
    // $scope.reprintdate=response[0].BilledDate;
    // console.log($scope.reprintdate);
    // alert(response.length);

    if(response.length != 0){
       window.location.href='receiptReprint.html';
    }
  })
}





}]);//end of first controller

myApp.controller('billreprintCntrl',['$scope','$http','$window',
  function($scope,$http,$window){
    // $scope.names="vinay";
    $scope.Rbillno=window.sessionStorage.getItem("rbill");
    console.log($scope.Rbillno);
    $scope.resdata=JSON.parse(window.sessionStorage.getItem("res"));
    console.log($scope.resdata);
    // var xdate=$scope.resdata[0].BilledDate;
    // var xdate1=xdate.split("T");
    // $scope.xdate12=xdate1[0];
    // console.log($scope.xdate12);
    $scope.partyname = $scope.resdata[0].partyname;
    console.log($scope.partyname);
    $scope.reprintBillNo = $scope.resdata[0].BillNo;
    console.log($scope.reprintBillNo);
    $scope.respectiveVoucherno = $scope.resdata[0].voucherNo;
    $scope.reprintdate = $scope.resdata[0].BilledDate;
    console.log($scope.reprintdate);
    $scope.totalAmts = $scope.resdata[0].PaidAmount;
    // numberwords($scope.totalAmts)
   
$http.get('/getmerchantdetails').success(function(response){
       console.log(response);
       $scope.Landmark =response[0].Address[0].Landmark;

       $scope.Street =response[0].Address[1].Street;
       $scope.Place =response[0].Address[2].Place;
       $scope.Phone =response[0].Address[3].Phone;
       $scope.Mobile =response[0].Address[4].Mobile;
       $scope.email =response[0].Address[5].email;

       $scope.ShopName =response[0].ShopName;


    });


// $scope.rePrinting=function(){
//   $scope.name="vinnu"
//    // alert($scope.billid+","+$scope.smode+","+$scope.samount);
//   // console.log($scope.billid+"id id id"+$scope.samount);
//   // $scope.datasearch=$scope.billid+","+$scope.smode+","+$scope.samount;
//   $http.get('/reprintdata'+$scope.Rbillno).success(function(response){
//     console.log(response);
//     $scope.datareprint=response;
//  // alert($scope.datareprint);
//  console.log($scope.datareprint);
//   // alert(response+"var")
// // });
//   // numberwords(response[0].Amount.$numberDecimal);
//     // $scope.totalAmts=response[0].Amount.$numberDecimal;
//     // // $scope.totalAmts="shivu"
//     // console.log($scope.totalAmts);
//     // $scope.reprintBillNo=response[0].BillNo;
//     // console.log($scope.reprintBillNo);
//     // $scope.reprintdate=response[0].BilledDate;
//     // console.log($scope.reprintdate);
//     // alert(response.length);

//     if(response.length != 0){
//        window.location.href='receiptReprint.html';
//     }
//   })
// }

var numberwords = function(total){ 
  console.log(total);
  // alert("numberwords"+total)       
        var amount = total;
    console.log(amount)
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    
    console.log(amount)
    
    var atemp = amount.split(".");
    
    console.log(atemp)
    
    var number = atemp[0].split(",").join("");
    
    console.log(number)
    var n_length = number.length;
    
    console.log(n_length)
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
        console.log(words_string)
        $scope.wor = words_string;
    }
  }
numberwords($scope.totalAmts.$numberDecimal)
}]);





  