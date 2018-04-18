module.exports = function (app) {
  console.log(" print pdf");
  var fs = require('fs');

  var events = require('events');
  var eventEmitter = new events.EventEmitter();

    var mkdirp = require('mkdirp');
    var path = require('path');
    var ObjectID = require('mongodb').ObjectID;
    var mongojs=require('mongojs');
    var Decimal128 = require('mongodb').Decimal128;
    var db=mongojs('inventory200',['user','tags','transaction','saleInvoice','mode','transactionDetail','batch','bank',
  'transactionSeriesInvoice','itemrate','item','menu','order','useritem','purity','uom','pct','labcal','useradj',
  'barCodeSummary','stockPointMaster','configurations','inventoryGroupMaster','salesCategoryMaster','itemType','taxrate',
  'items','tax','taxation','inventoryGroupValueNotation','inventoryGroupValueNotationDaily','salesPerson','loginDetails',
  'trHeaders','gIControlTables','history','ledgerActs','ledgeraccounts','mainclasses','maingroups','mcIds',
  'roundOffConfig','sgIds','subgroups','subscribers','trDetails','transactionInvoice','ugIds','updatelist','user',
  'users','merchantDetails','trail','staff','cardType','orders','printData','receipts','payments','orderManage','orderType']);

var fileNameOrder = null;
var cashAdvance = null;
var transactionData = null;
   //pdf trial start
function pdfPrintCall(orderNO,partyNames,staff,address){
var PDFDocument, doc;
var fs = require('fs');

//var PdfTable = require('voilab-pdf-table'),
    //PdfDocument = require('pdfkit');

PDFDocument = require('pdfkit');
doc1 = new PDFDocument ;
 
            var datePrint = new Date();
            var day = datePrint.getDate();
            var month = datePrint.getMonth() + 1;
            var year = datePrint.getFullYear();
            var hours = datePrint.getHours(); // => 9
            var minutes = datePrint.getMinutes(); // =>  30
            var seconds = datePrint.getSeconds(); // => 51
                        
            var postfix = hours+'.'+minutes+'.'+seconds+'.'+day + "." + month + "." + year;
            var dateDisplay = day + "/" + month + "/" + year;
            fileNameOrder = 'order'+postfix+'.pdf'
doc1.pipe (fs.createWriteStream('./public/pdfPrint/order'+postfix+'.pdf'))

console.log(pdfMerchantData)
  var heightOfHeader = 20;
doc1.font('Times-Roman')
   .fontSize(15)
   
   .text(pdfMerchantData[0].ShopName, 10, heightOfHeader)
   // heightOfHeader += 20;
   // .text(pdfMerchantData[0].Address[0].Landmark, 10,heightOfHeader)
   heightOfHeader += 20;
   //+" "+pdfMerchantData[0].Address[2].Place
   doc1.text(pdfMerchantData[0].Address[1].Street+" "+pdfMerchantData[0].Address[2].Place, 10,heightOfHeader)
   heightOfHeader += 20;
   doc1.text(pdfMerchantData[0].Address[3].Phone+" "+"/ "+pdfMerchantData[0].Address[4].Mobile, 10, heightOfHeader)
     heightOfHeader += 20;
    doc1.text(pdfMerchantData[0].Address[5].email, 10, heightOfHeader)

doc1.moveDown()

    doc1.text('Order',{align: 'center'})
    //party details 
     heightOfHeader += 20; 
     var rigthSide = heightOfHeader; 
    doc1.text('PartyName'+":"+partyNames , 10, heightOfHeader)
     heightOfHeader += 20;  
    doc1.text('Address'+":"+address, 10, heightOfHeader)
     heightOfHeader += 20;  
    doc1.text('City'+':'+pdfPartyCity, 10, heightOfHeader)
       //heightOfHeader += 20;  
    doc1.text('Order No'+":"+orderNO , 400, rigthSide)
    rigthSide += 20;
    doc1.text('Date'+":"+dateDisplay, 400, rigthSide)
    rigthSide += 20;
    doc1.text('Staff'+':'+staff, 400, rigthSide)
    doc1.save()
    heightOfHeader += 20;
   doc1.moveTo(10, heightOfHeader)
   .lineTo(600,heightOfHeader)
    .fill("black")

    
   //  heightOfHeader += 20;
   //  doc1.fontSize(12)
   //  .moveTo(10, heightOfHeader)
   // .lineTo(600,heightOfHeader)
   //  .fill("black")
//heightOfHeader += 20;
var width1 = 0;
var height1 = heightOfHeader+2;
doc1.fontSize(12)
//table hearder displaying
    var widthHeader = 10;
    textInRowFirst(doc1, 'Particulars ', height1,widthHeader);
    widthHeader += 140;
    textInRowFirst(doc1, 'Purity', height1,widthHeader);
     widthHeader += 40;
    textInRowFirst(doc1, 'Sc.Wt', height1,widthHeader);
     widthHeader += 40;
    textInRowFirst(doc1, 'St.Wt', height1,widthHeader);
     widthHeader += 40;
    textInRowFirst(doc1, 'NettWt', height1,widthHeader);
     widthHeader += 40;
    textInRowFirst(doc1, 'Wastage', height1,widthHeader);
     widthHeader += 50;
    textInRowFirst(doc1, 'Rate', height1,widthHeader);
     widthHeader += 40;
    textInRowFirst(doc1, 'StAmt', height1,widthHeader);
     widthHeader += 40;
    textInRowFirst(doc1, 'Labour', height1,widthHeader);
    widthHeader += 40;
    textInRowFirst(doc1, 'Due ', height1,widthHeader);
    widthHeader += 60;
    textInRowFirst(doc1, 'Total', height1,widthHeader);
//textInRowFirst(doc1, 'Sc.Wt', 300,width1);
       heightOfHeader += 20;
    doc1.fontSize(12)
    .moveTo(10, heightOfHeader)
   .lineTo(600,heightOfHeader)
    .fill("black")

function textInRowFirst(doc1, text, heigth,width) {
  doc1.y = heigth;
  doc1.x = width;
 // width1 += 54;
  doc1.fillColor('black')
  doc1.text(text, {
    paragraphGap: 5,
    indent: 5,
    align: 'justify',
    columns: 1,

  });
  return doc1
}//textInRowFirst
  heightOfHeader += 20;
   var heightOfPage = heightOfHeader;
   var detailsDisplayLength = detailsDisplay.length-1;
   incrementDisplay(detailsDisplayLength,heightOfPage)

      //var increment = 0;
      
    function incrementDisplay (j,height1) {
       //console.log( " before    jjjjjjjjjjjjjjjjjjjjjjjj "+j+ typeof(j))
          if (j>=0) {
             width1 = 0;
             height1 = height1;
              var widthBody = 10;
   
            // orderValue  = parseFloat(orderValue) + parseFloat(detailsDisplay[j].final)
            // taxAmount = taxAmount + parseFloat(detailsDisplay[j].taxamt)
            console.log(  parseFloat(orderValue) +"   orderValue "+"  ijjjjjjjjjjjjjjjjjjjjjjjj "+ parseFloat(detailsDisplay[j].final))
            textInRowFirst(doc1, detailsDisplay[j].itemName, height1,widthBody);
            widthBody += 140;
            textInRowFirst(doc1, detailsDisplay[j].purity, height1,widthBody);
            widthBody += 40;
            textInRowFirst(doc1, detailsDisplay[j].gwt, height1,widthBody);
            widthBody += 40;
            textInRowFirst(doc1, detailsDisplay[j].stwt, height1,widthBody);
            widthBody += 40;
            textInRowFirst(doc1, detailsDisplay[j].ntwt, height1,widthBody);
            widthBody += 40;
            textInRowFirst(doc1, detailsDisplay[j].wastage, height1,widthBody);
            widthBody += 50;
            textInRowFirst(doc1, detailsDisplay[j].rate, height1,widthBody);
            widthBody += 40;
            textInRowFirst(doc1, detailsDisplay[j].stval, height1,widthBody);
            widthBody += 40;
            textInRowFirst(doc1, detailsDisplay[j].labval, height1,widthBody);
             var datePrint = new Date(detailsDisplay[j].usedate);
            var day = datePrint.getDate();
            var month = datePrint.getMonth() + 1;
            var year = datePrint.getFullYear();
            var hours = datePrint.getHours(); // => 9
            var minutes = datePrint.getMinutes(); // =>  30
            var seconds = datePrint.getSeconds(); // => 51
                        
            //var postfix = hours+'.'+minutes+'.'+seconds+'.'+day + "." + month + "." + year;
            var dateDisplay = day + "/" + month + "/" + year;
            widthBody += 40;  
            textInRowFirst(doc1, dateDisplay, height1,widthBody);
            widthBody += 60;
            textInRowFirst(doc1, detailsDisplay[j].final, height1,widthBody);
            //detailsDisplay.length --;
            heightOfPage += 20;
            detailsDisplayLength -- ;
             console.log(" increment  detailsDisplay.length "+detailsDisplayLength)
           
            incrementDisplay(detailsDisplayLength,heightOfPage) 
          }; 
      
    }//incrementDisplay
    

     console.log(" heightOfPage line before "+heightOfPage)        
   doc1.moveTo(10, heightOfPage += 20)
   .lineTo(600,heightOfPage)
    .fill("black") 
    // heightOfPage += 20
     doc1.y = heightOfPage;
    doc1.x = 10;

    // console.log(" heightOfPage line after "+heightOfPage+" doc1.y = "+doc1.y) 
    heightOfPage += 20;
    doc1.y = heightOfPage;
    // console.log(" heightOfPage tax to display "+heightOfPage+" doc1.y = "+doc1.y) 
    doc1.text('Tax Amount (Estimated)'+':'+(taxAmount).toFixed(2),{align: 'right'})
    //doc1.text('Tax vijay (Estimated)'+':'+'2000.00',150,320)
    heightOfPage += 20;
    doc1.y = heightOfPage;
    doc1.text('Order Value (Estimated)'+':'+(orderValue).toFixed(2),{align: 'right',})
    heightOfPage += 20;
    doc1.y = heightOfPage;
    if (cashAdvance != '') {
        doc1.text('Cash Advance '+':'+cashAdvance,{align: 'left'})
    };
  
     heightOfPage += 20;
    doc1.y = heightOfPage;
      //doc1.text('Material Advance :',{align: 'left'})
    if (transactionData != null) {
      doc1.text('Material Advance :',{align: 'left'})
      for (var i = transactionData.length - 1; i >= 0; i--) {
       doc1.x = 120;
       doc1.text(transactionData[i].itemName+' '+transactionData[i].ntwt+'Gms',{align: 'left'})
       heightOfPage += 20;
      };
    
     };
       doc1.x = 10;
      heightOfPage += 40;
    doc1.y = heightOfPage;
    doc1.text('Party Signature',{align: 'left'})
    .text('For '+pdfMerchantData[0].ShopName,10,heightOfPage,{align: 'right'})

  //dataPrintInCollection(fileNameOrder,detailsDisplay[0].orderNO,detailsDisplay[0].itemName)
 
   doc1.end()

}// pdfPrintCall



var fileNameMaterialReceipt = null;


    //pdf trial start
function pdfPrintCallReceipt(orderNO,partyNames,staff,address,voucherNo,condition){
var PDFDocument, doc;
var fs = require('fs');

//var PdfTable = require('voilab-pdf-table'),
    //PdfDocument = require('pdfkit');
   

PDFDocument = require('pdfkit');
doc = new PDFDocument;
 
            var datePrint = new Date();
            var day = datePrint.getDate();
            var month = datePrint.getMonth() + 1;
            var year = datePrint.getFullYear();
            var hours = datePrint.getHours(); // => 9
            var minutes = datePrint.getMinutes(); // =>  30
            var seconds = datePrint.getSeconds(); // => 51
                        
            var postfix = hours+'.'+minutes+'.'+seconds+'.'+day + "." + month + "." + year;
            var dateDisplay = day + "/" + month + "/" + year;
             fileNameMaterialReceipt = 'MaterialReceipt'+postfix+'.pdf'
doc.pipe (fs.createWriteStream('./public/pdfPrint/MaterialReceipt'+postfix+'.pdf'))

console.log(pdfMerchantData)
  var heightOfHeader = 20;
doc.font('Times-Roman')
   .fontSize(15)
   
   .text(pdfMerchantData[0].ShopName, 10, heightOfHeader)
   // heightOfHeader += 20;
   // .text(pdfMerchantData[0].Address[0].Landmark, 10,heightOfHeader)
   heightOfHeader += 20;
   //+" "+pdfMerchantData[0].Address[2].Place
   doc.text(pdfMerchantData[0].Address[1].Street+" "+pdfMerchantData[0].Address[2].Place, 10,heightOfHeader)
   heightOfHeader += 20;
   doc.text(pdfMerchantData[0].Address[3].Phone+" "+"/ "+pdfMerchantData[0].Address[4].Mobile, 10, heightOfHeader)
     heightOfHeader += 20;
    doc.text(pdfMerchantData[0].Address[5].email, 10, heightOfHeader)

doc.moveDown()

    doc.text('Receipt Voucher',{align: 'center'})
    //party details 
     heightOfHeader += 40; 
     var rigthSide = heightOfHeader; 
     if (condition == true) {
        doc.text('Vendor Name'+":"+partyNames , 10, heightOfHeader)
     }else{
        doc.text('PartyName'+":"+partyNames , 10, heightOfHeader)
     }
    
     heightOfHeader += 20;  
    doc.text('Address'+":"+address, 10, heightOfHeader)
     heightOfHeader += 20;  
    doc.text('City'+':'+pdfPartyCity, 10, heightOfHeader)
       //heightOfHeader += 20;  
    doc.text('Voucher No'+":"+voucherNo , 400, rigthSide)
    rigthSide += 20;
    doc.text('order No'+":"+orderNO , 400, rigthSide)
    rigthSide += 20;
    doc.text('Date'+":"+dateDisplay, 400, rigthSide)
    // rigthSide += 20;
    // doc.text('Staff'+':'+staff, 400, rigthSide)
    doc.save()
    heightOfHeader += 20;
   doc.moveTo(10, heightOfHeader)
   .lineTo(600,heightOfHeader)
    .fill("black")

    
   //  heightOfHeader += 20;
   //  doc.fontSize(12)
   //  .moveTo(10, heightOfHeader)
   // .lineTo(600,heightOfHeader)
   //  .fill("black")
//heightOfHeader += 20;
var width1 = 0;
var height1 = heightOfHeader+2;
doc.fontSize(12)
//table hearder displaying
    var widthHeader = 12;
    textInRowFirst(doc, 'Particulars ', height1,widthHeader);
    widthHeader += 200;
    textInRowFirst(doc, 'Purity', height1,widthHeader);
     widthHeader += 80;
    textInRowFirst(doc, 'Sc.Wt', height1,widthHeader);
    widthHeader += 80;
    textInRowFirst(doc, 'NettWt', height1,widthHeader);
     widthHeader += 80;
    textInRowFirst(doc, 'Labour', height1,widthHeader);
  
//textInRowFirst(doc, 'Sc.Wt', 300,width1);
       heightOfHeader += 20;
    doc.fontSize(12)
    .moveTo(10, heightOfHeader)
   .lineTo(600,heightOfHeader)
    .fill("black")

function textInRowFirst(doc, text, heigth,width) {
  doc.y = heigth;
  doc.x = width;
 // width1 += 54;
  doc.fillColor('black')
  doc.text(text, {
    paragraphGap: 5,
    indent: 5,
    align: 'justify',
    columns: 1,

  });
  return doc
}//textInRowFirst
  heightOfHeader += 20;
   var heightOfPage = heightOfHeader;
   var detailsDisplayLength = detailsDisplay.length-1;
   incrementDisplay(detailsDisplayLength,heightOfPage)

      //var increment = 0;
      
    function incrementDisplay (j,height1) {
       //console.log( " before    jjjjjjjjjjjjjjjjjjjjjjjj "+j+ typeof(j))
          if (j>=0) {
             width1 = 0;
             height1 = height1;
              var widthBody = 10;
   
            // orderValue  = parseFloat(orderValue) + parseFloat(detailsDisplay[j].final)
            // taxAmount = taxAmount + parseFloat(detailsDisplay[j].taxamt)
            console.log(  parseFloat(orderValue) +"   orderValue "+"  ijjjjjjjjjjjjjjjjjjjjjjjj "+ parseFloat(detailsDisplay[j].final))
            textInRowFirst(doc, detailsDisplay[j].itemName, height1,widthBody);
            widthBody += 200;
            textInRowFirst(doc, detailsDisplay[j].purity, height1,widthBody);
            widthBody += 80;
            textInRowFirst(doc, detailsDisplay[j].gwt, height1,widthBody);
            widthBody += 80;
            textInRowFirst(doc, detailsDisplay[j].ntwt, height1,widthBody);
             widthBody += 80;
            textInRowFirst(doc, detailsDisplay[j].labval, height1,widthBody);
             //detailsDisplay.length --;
            heightOfPage += 20;
            detailsDisplayLength -- ;
             console.log(" increment  detailsDisplay.length "+detailsDisplayLength)
           
            incrementDisplay(detailsDisplayLength,heightOfPage) 
          }; 
      
    }//incrementDisplay
    

     console.log(" heightOfPage line before "+heightOfPage)        
   doc.moveTo(10, heightOfPage += 20)
   .lineTo(600,heightOfPage)
    .fill("black") 
    // heightOfPage += 20
     doc.y = heightOfPage;
    doc.x = 10;

    heightOfPage += 40;
    
    doc.y = heightOfPage;
    doc.text('Party Signature',{align: 'left'})
    .text('For '+pdfMerchantData[0].ShopName,10,heightOfPage,{align: 'right'})
       //console.log(" start fileName fileName fileName fileName "+fileName)
    if (condition != true) {
      dataPrintInCollection(fileNameMaterialReceipt,orderNO,detailsDisplay[0].itemName)
    };
    doc.end()
}// 



var fileNameMaterialAmount = null;

    //pdf trial start
function pdfPrintCallAmount(orderNO,partyNames,staff,address,voucherNo){


var PDFDocument, doc2;
var fs = require('fs');


PDFDocument = require('pdfkit');
doc2 = new PDFDocument;


 
            var datePrint = new Date();
            var day = datePrint.getDate();
            var month = datePrint.getMonth() + 1;
            var year = datePrint.getFullYear();
            var hours = datePrint.getHours(); // => 9
            var minutes = datePrint.getMinutes(); // =>  30
            var seconds = datePrint.getSeconds(); // => 51
                        
            var postfix = hours+'.'+minutes+'.'+seconds+'.'+day + "." + month + "." + year;
            var dateDisplay = day + "/" + month + "/" + year;
             fileNameMaterialAmount = 'amount'+postfix+'.pdf'
doc2.pipe (fs.createWriteStream('./public/pdfPrint/amount'+postfix+'.pdf'))

console.log(pdfMerchantData)
  var heightOfHeader = 20;
doc2.font('Times-Roman')
   .fontSize(15)
   
   .text(pdfMerchantData[0].ShopName, 10, heightOfHeader)
   // heightOfHeader += 20;
   // .text(pdfMerchantData[0].Address[0].Landmark, 10,heightOfHeader)
   heightOfHeader += 20;
   //+" "+pdfMerchantData[0].Address[2].Place
   doc2.text(pdfMerchantData[0].Address[1].Street+" "+pdfMerchantData[0].Address[2].Place, 10,heightOfHeader)
   heightOfHeader += 20;
   doc2.text(pdfMerchantData[0].Address[3].Phone+" "+"/ "+pdfMerchantData[0].Address[4].Mobile, 10, heightOfHeader)
     heightOfHeader += 20;
    doc2.text(pdfMerchantData[0].Address[5].email, 10, heightOfHeader)

doc2.moveDown()

    doc2.text('Receipt ',{align: 'center'})
    //party details 
     heightOfHeader += 40; 
     var rigthSide = heightOfHeader; 
    doc2.text('For Order advance from '+":"+partyNames , 10, heightOfHeader)
   //commented on 26/3 voucher number is not available here only order appers 
    doc2.text('Receipt No'+":"+ detailsDisplay[0].BillNo , 400, rigthSide)
     rigthSide += 20;
    //comm ended 26/3
     doc2.text('order No'+":"+orderNO , 400, rigthSide)
    rigthSide += 20;

    doc2.text('Date'+":"+dateDisplay, 400, rigthSide)
    // rigthSide += 20;
    // doc2.text('Staff'+':'+staff, 400, rigthSide)
      heightOfHeader += 40;  
    doc2.text('Payment details are as follows: ', 10, heightOfHeader)
   
    doc2.save()
    heightOfHeader += 20;
   doc2.moveTo(10, heightOfHeader)
   .lineTo(600,heightOfHeader)
    .fill("black")

    
   //  heightOfHeader += 20;
   //  doc2.fontSize(12)
   //  .moveTo(10, heightOfHeader)
   // .lineTo(600,heightOfHeader)
   //  .fill("black")
//heightOfHeader += 20;
var width1 = 0;
var height1 = heightOfHeader+2;
doc2.fontSize(12)
//table hearder displaying
    var widthHeader = 12;
    textInRowFirst(doc2, 'Payment Mode', height1,widthHeader);
    widthHeader += 200;
    textInRowFirst(doc2, 'Bank Name', height1,widthHeader);
     widthHeader += 80;
    textInRowFirst(doc2, 'Cheque No.', height1,widthHeader);
    widthHeader += 80;
    textInRowFirst(doc2, 'Date', height1,widthHeader);
     widthHeader += 80;
    textInRowFirst(doc2, 'Amount', height1,widthHeader);
  
//textInRowFirst(doc2, 'Sc.Wt', 300,width1);
       heightOfHeader += 20;
    doc2.fontSize(12)
    .moveTo(10, heightOfHeader)
   .lineTo(600,heightOfHeader)
    .fill("black")

function textInRowFirst(doc2, text, heigth,width) {
  doc2.y = heigth;
  doc2.x = width;
 // width1 += 54;
  doc2.fillColor('black')
  doc2.text(text, {
    paragraphGap: 5,
    indent: 5,
    align: 'justify',
    columns: 1,

  });
  return doc2
}//textInRowFirst
  heightOfHeader += 20;
   var heightOfPage = heightOfHeader;
   var detailsDisplayLength = detailsDisplay.length-1;
   incrementDisplay(detailsDisplayLength,heightOfPage)

      //var increment = 0;
      
    function incrementDisplay (j,height1) {
       //console.log( " before    jjjjjjjjjjjjjjjjjjjjjjjj "+j+ typeof(j))
          if (j>=0) {
             width1 = 0;
             height1 = height1;
              var widthBody = 10;
   
            // orderValue  = parseFloat(orderValue) + parseFloat(detailsDisplay[j].final)
            // taxAmount = taxAmount + parseFloat(detailsDisplay[j].taxamt)
            console.log(  parseFloat(orderValue) +"   orderValue "+"  ijjjjjjjjjjjjjjjjjjjjjjjj "+ parseFloat(detailsDisplay[j].final))
            textInRowFirst(doc2, detailsDisplay[j].Mode, height1,widthBody);
            widthBody += 200;
            textInRowFirst(doc2, detailsDisplay[j].Bank, height1,widthBody);
            widthBody += 80;
            textInRowFirst(doc2, detailsDisplay[j].ChequeNo, height1,widthBody);
            widthBody += 80;

              if(detailsDisplay[j].Date != null){
                    var datePrint = new Date(detailsDisplay[j].Date);
                    var day = datePrint.getDate();
                    var month = datePrint.getMonth() + 1;
                    var year = datePrint.getFullYear();
                    var hours = datePrint.getHours(); // => 9
                    var minutes = datePrint.getMinutes(); // =>  30
                    var seconds = datePrint.getSeconds(); // => 51
                                
                    //var postfix = hours+'.'+minutes+'.'+seconds+'.'+day + "." + month + "." + year;
                    var dateDisplay = day + "/" + month + "/" + year;

              }else{
                    var dateDisplay ='';
              }
              

            textInRowFirst(doc2, dateDisplay, height1,widthBody);
             widthBody += 80;
            textInRowFirst(doc2, detailsDisplay[j].Amount, height1,widthBody);
             //detailsDisplay.length --;
            heightOfPage += 20;
            detailsDisplayLength -- ;
             console.log(" increment  detailsDisplay.length "+detailsDisplayLength)
           
            incrementDisplay(detailsDisplayLength,heightOfPage) 
          }; 
      
    }//incrementDisplay
         

     console.log(" heightOfPage line before "+heightOfPage)        
   doc2.moveTo(10, heightOfPage += 20)
   .lineTo(600,heightOfPage)
    .fill("black") 
    // heightOfPage += 20
     doc2.y = heightOfPage+10;

    doc2.x = 10;
    //start
    heightOfPage += 20;
   doc2.text('Total'+':'+ detailsDisplay[0].PaidAmount,{align: 'right'})
    //doc1.text('Tax vijay (Estimated)'+':'+'2000.00',150,320)
    // heightOfPage += 20;
    // doc2.y = heightOfPage;
    // doc2.text('Voucher amount in words:'+':'+'Five hundred ',{align: 'left',})
    


    //enf





    heightOfPage += 40;
    
    doc2.y = heightOfPage;
    doc2.text('Party Signature',{align: 'left'})
    .text('For '+pdfMerchantData[0].ShopName,10,heightOfPage,{align: 'right'})
       //console.log(" start fileName fileName fileName fileName "+fileName)
   //fileNameMaterialAmount 
   dataPrintInCollection(fileNameMaterialAmount,detailsDisplay[0].orderNO,detailsDisplay[0].PaidAmount)
   doc2.end()
   

}// pdfPrintCall


var fileNameIssueVoucherPdf = null;


    //pdf trial start
function  pdfPrintCallIssueVoucherPdf(orderNO,partyNames,staff,address,voucherNo){
  var PDFDocument, doc;
  var fs = require('fs');

  PDFDocument = require('pdfkit');
  doc = new PDFDocument;
 
            var datePrint = new Date();
            var day = datePrint.getDate();
            var month = datePrint.getMonth() + 1;
            var year = datePrint.getFullYear();
            var hours = datePrint.getHours(); // => 9
            var minutes = datePrint.getMinutes(); // =>  30
            var seconds = datePrint.getSeconds(); // => 51
                        
            var postfix = hours+'.'+minutes+'.'+seconds+'.'+day + "." + month + "." + year;
            var dateDisplay = day + "/" + month + "/" + year;
             fileNameIssueVoucherPdf = 'issueVoucherPdf'+postfix+'.pdf'
doc.pipe (fs.createWriteStream('./public/pdfPrint/issueVoucherPdf'+postfix+'.pdf'))

console.log(pdfMerchantData)
  var heightOfHeader = 20;
doc.font('Times-Roman')
   .fontSize(15)
   
   .text(pdfMerchantData[0].ShopName, 10, heightOfHeader)
   // heightOfHeader += 20;
   // .text(pdfMerchantData[0].Address[0].Landmark, 10,heightOfHeader)
   heightOfHeader += 20;
   //+" "+pdfMerchantData[0].Address[2].Place
   doc.text(pdfMerchantData[0].Address[1].Street+" "+pdfMerchantData[0].Address[2].Place, 10,heightOfHeader)
   heightOfHeader += 20;
   doc.text(pdfMerchantData[0].Address[3].Phone+" "+"/ "+pdfMerchantData[0].Address[4].Mobile, 10, heightOfHeader)
     heightOfHeader += 20;
    doc.text(pdfMerchantData[0].Address[5].email, 10, heightOfHeader)

doc.moveDown()

    doc.text('Issue Voucher',{align: 'center'})
    //party details 
     heightOfHeader += 40; 
     var rigthSide = heightOfHeader; 
    doc.text('Vendor Name'+":"+partyNames , 10, heightOfHeader)
     heightOfHeader += 20;  
    doc.text('Address'+":"+address, 10, heightOfHeader)
     heightOfHeader += 20;  
    doc.text('City'+':'+pdfPartyCity, 10, heightOfHeader)
       //heightOfHeader += 20;  
    doc.text('Voucher No'+":"+voucherNo , 400, rigthSide)
    rigthSide += 20;
    
     doc.text('order No'+":"+orderNO , 400, rigthSide)
    rigthSide += 20;
    doc.text('Date'+":"+dateDisplay, 400, rigthSide)
    // rigthSide += 20;
    // doc.text('Staff'+':'+staff, 400, rigthSide)
    doc.save()
    heightOfHeader += 20;
   doc.moveTo(10, heightOfHeader)
   .lineTo(600,heightOfHeader)
    .fill("black")

    
   //  heightOfHeader += 20;
   //  doc.fontSize(12)
   //  .moveTo(10, heightOfHeader)
   // .lineTo(600,heightOfHeader)
   //  .fill("black")
//heightOfHeader += 20;
var width1 = 0;
var height1 = heightOfHeader+2;
doc.fontSize(12)
//table hearder displaying
    var widthHeader = 12;
    textInRowFirst(doc, 'Particulars ', height1,widthHeader);
    widthHeader += 200;
    textInRowFirst(doc, 'Purity', height1,widthHeader);
     widthHeader += 80;
    textInRowFirst(doc, 'Sc.Wt', height1,widthHeader);
    widthHeader += 80;
    textInRowFirst(doc, 'NettWt', height1,widthHeader);
     widthHeader += 80;
    textInRowFirst(doc, 'Labour', height1,widthHeader);
  
//textInRowFirst(doc, 'Sc.Wt', 300,width1);
       heightOfHeader += 20;
    doc.fontSize(12)
    .moveTo(10, heightOfHeader)
   .lineTo(600,heightOfHeader)
    .fill("black")

function textInRowFirst(doc, text, heigth,width) {
  doc.y = heigth;
  doc.x = width;
 // width1 += 54;
  doc.fillColor('black')
  doc.text(text, {
    paragraphGap: 5,
    indent: 5,
    align: 'justify',
    columns: 1,

  });
  return doc
}//textInRowFirst
  heightOfHeader += 20;
   var heightOfPage = heightOfHeader;
   var detailsDisplayLength = detailsDisplay.length-1;
   incrementDisplay(detailsDisplayLength,heightOfPage)

      //var increment = 0;
      
    function incrementDisplay (j,height1) {
       //console.log( " before    jjjjjjjjjjjjjjjjjjjjjjjj "+j+ typeof(j))
          if (j>=0) {
             width1 = 0;
             height1 = height1;
              var widthBody = 10;
   
            // orderValue  = parseFloat(orderValue) + parseFloat(detailsDisplay[j].final)
            // taxAmount = taxAmount + parseFloat(detailsDisplay[j].taxamt)
            console.log(  parseFloat(orderValue) +"   orderValue "+"  ijjjjjjjjjjjjjjjjjjjjjjjj "+ parseFloat(detailsDisplay[j].final))
            textInRowFirst(doc, detailsDisplay[j].itemName, height1,widthBody);
            widthBody += 200;
            textInRowFirst(doc, detailsDisplay[j].purity, height1,widthBody);
            widthBody += 80;
            textInRowFirst(doc, detailsDisplay[j].gwt, height1,widthBody);
            widthBody += 80;
            textInRowFirst(doc, detailsDisplay[j].ntwt, height1,widthBody);
             widthBody += 80;
            textInRowFirst(doc, detailsDisplay[j].labval, height1,widthBody);
             //detailsDisplay.length --;
            heightOfPage += 20;
            detailsDisplayLength -- ;
             console.log(" increment  detailsDisplay.length "+detailsDisplayLength)
           
            incrementDisplay(detailsDisplayLength,heightOfPage) 
          }; 
      
    }//incrementDisplay
    

     console.log(" heightOfPage line before "+heightOfPage)        
   doc.moveTo(10, heightOfPage += 20)
   .lineTo(600,heightOfPage)
    .fill("black") 
    // heightOfPage += 20
     doc.y = heightOfPage;
    doc.x = 10;

    heightOfPage += 40;
    
    doc.y = heightOfPage;
    doc.text('Party Signature',{align: 'left'})
    .text('For '+pdfMerchantData[0].ShopName,10,heightOfPage,{align: 'right'})
       //console.log(" start fileName fileName fileName fileName "+fileName)
   // dataPrintInCollection(fileNameIssueVoucherPdf,orderNO,detailsDisplay[0].itemName)
 
    doc.end()
}// 

var issueVoucherData = null;
var fileNameIssueVoucher = null;  
//pdfPrintCallIssueVoucher(partyNames,address,data)
function pdfPrintCallIssueVoucher(partyNames){
//console.log(" pdfPrintCallIssueVoucher "+issueVoucherData[0].itemName)
console.log(" pdfPrintCallIssueVoucher oooo  "+issueVoucherData.itemName)
var PDFDocumentt, doc4;
var fs = require('fs');

PDFDocument = require('pdfkit');
doc4 = new PDFDocument;
 
            var datePrint = new Date();
            var day = datePrint.getDate();
            var month = datePrint.getMonth() + 1;
            var year = datePrint.getFullYear();
            var hours = datePrint.getHours(); // => 9
            var minutes = datePrint.getMinutes(); // =>  30
            var seconds = datePrint.getSeconds(); // => 51
                        
            var postfix = hours+'.'+minutes+'.'+seconds+'.'+day + "." + month + "." + year;
            var dateDisplay = day + "/" + month + "/" + year;
             fileNameIssueVoucher = 'issueVoucher'+postfix+'.pdf'
doc4.pipe (fs.createWriteStream('./public/pdfPrint/issueVoucher'+postfix+'.pdf'))

console.log(pdfMerchantData)
  var heightOfHeader = 20;
doc4.font('Times-Roman')
   .fontSize(15)
   
   .text(pdfMerchantData[0].ShopName, 10, heightOfHeader)
   // heightOfHeader += 20;
   // .text(pdfMerchantData[0].Address[0].Landmark, 10,heightOfHeader)
   heightOfHeader += 20;
   //+" "+pdfMerchantData[0].Address[2].Place
   doc4.text(pdfMerchantData[0].Address[1].Street+" "+pdfMerchantData[0].Address[2].Place, 10,heightOfHeader)
   heightOfHeader += 20;
   doc4.text(pdfMerchantData[0].Address[3].Phone+" "+"/ "+pdfMerchantData[0].Address[4].Mobile, 10, heightOfHeader)
     heightOfHeader += 20;
    doc4.text(pdfMerchantData[0].Address[5].email, 10, heightOfHeader)

doc4.moveDown()

    doc4.text('Issue Voucher',{align: 'center'})
    //party details 
     heightOfHeader += 40; 
     var rigthSide = heightOfHeader; 
    doc4.text('PartyName'+":"+partyNames , 10, heightOfHeader)
     heightOfHeader += 20;  
    doc4.text('Address'+":"+pdfPartyData[0].data.address1, 10, heightOfHeader)
     heightOfHeader += 20;  
    doc4.text('City'+':'+pdfPartyCity, 10, heightOfHeader)
       //heightOfHeader += 20;  
    doc4.text('Voucher No'+":"+issueVoucherData.voucherNo , 400, rigthSide)
    rigthSide += 20;
    doc4.text('RefId'+':'+issueVoucherData.refId, 400, rigthSide)
    rigthSide += 20;
    doc4.text('Date'+":"+dateDisplay, 400, rigthSide)
    // rigthSide += 20;
    // doc4.text('Staff'+':'+staff, 400, rigthSide)
    doc4.save()
    heightOfHeader += 20;
   doc4.moveTo(10, heightOfHeader)
   .lineTo(600,heightOfHeader)
    .fill("black")

    
   //  heightOfHeader += 20;
   //  doc4.fontSize(12)
   //  .moveTo(10, heightOfHeader)
   // .lineTo(600,heightOfHeader)
   //  .fill("black")
//heightOfHeader += 20;
var width1 = 0;
var height1 = heightOfHeader+2;
doc4.fontSize(12)
//table hearder displaying
    var widthHeader = 12;
    textInRowFirst(doc4, 'Particulars ', height1,widthHeader);
    widthHeader += 200;
    textInRowFirst(doc4, 'Purity', height1,widthHeader);
     widthHeader += 200;
    textInRowFirst(doc4, 'Weight', height1,widthHeader);
   
       heightOfHeader += 20;
    doc4.fontSize(12)
    .moveTo(10, heightOfHeader)
   .lineTo(600,heightOfHeader)
    .fill("black")

function textInRowFirst(doc4, text, heigth,width) {
  doc4.y = heigth;
  doc4.x = width;
 // width1 += 54;
  doc4.fillColor('black')
  doc4.text(text, {
    paragraphGap: 5,
    indent: 5,
    align: 'justify',
    columns: 1,

  });
  return doc4
}//textInRowFirst
  heightOfHeader += 20;
   var heightOfPage = heightOfHeader;
   var detailsDisplayLength = 0;
   incrementDisplay(detailsDisplayLength,heightOfPage)

      //var increment = 0;
      
    function incrementDisplay (j,height1) {
       //console.log( " before    jjjjjjjjjjjjjjjjjjjjjjjj "+j+ typeof(j))
          if (j>=0) {
             width1 = 0;
             height1 = height1;
              var widthBody = 10;
   
            // orderValue  = parseFloat(orderValue) + parseFloat(detailsDisplay[j].final)
            // taxAmount = taxAmount + parseFloat(detailsDisplay[j].taxamt)
           // console.log(  parseFloat(orderValue) +"   orderValue "+"  ijjjjjjjjjjjjjjjjjjjjjjjj "+ parseFloat(detailsDisplay[j].final))
            textInRowFirst(doc4, issueVoucherData.itemName, height1,widthBody);
            widthBody += 200;
            textInRowFirst(doc4, issueVoucherData.purity, height1,widthBody);
            widthBody += 200;
            textInRowFirst(doc4,issueVoucherData.gwt, height1,widthBody);
            // widthBody += 80;
            // textInRowFirst(doc4, issueVoucherData.chgunt, height1,widthBody);
            // //  widthBody += 80;
            // textInRowFirst(doc4, detailsDisplay[j].labval, height1,widthBody);
            //  //detailsDisplay.length --;
            heightOfPage += 20;
            detailsDisplayLength -- ;
            // console.log(" increment  detailsDisplay.length "+detailsDisplayLength)
           
            incrementDisplay(detailsDisplayLength,heightOfPage) 
          }; 
      
    }//incrementDisplay
    

     console.log(" heightOfPage line before "+heightOfPage)        
   doc4.moveTo(10, heightOfPage += 20)
   .lineTo(600,heightOfPage)
    .fill("black") 
    // heightOfPage += 20
     doc4.y = heightOfPage;
    doc4.x = 10;

    heightOfPage += 40;
    
    doc4.y = heightOfPage;
    doc4.text('Party Signature',{align: 'left'})
    .text('For '+pdfMerchantData[0].ShopName,10,heightOfPage,{align: 'right'})
       //console.log(" start fileName fileName fileName fileName "+fileName)
   // dataPrintInCollection(fileNameMaterialReceipt,orderNO,detailsDisplay[0].itemName)
 
    doc4.end()
  

}// 

 
 function dataPrintInCollection (fileName,order,amount) {
  console.log("dataPrintInCollection dataPrintInCollectiondataPrintInCollection dataPrintInCollection dataPrintInCollection "+fileName)
   db.printData.insert({"orderNo" : order,
    "fileName" :fileName,
    "printStatus" : "no",
    'amount':amount
  })
 }


var pdfMerchantData = null;
function merchantDetailsCall(orderNO,partyNames,staff,condition,data){
  db.merchantDetails.find(function(err,merchantData){
        console.log(merchantData);
        pdfMerchantData = merchantData;
       // if (condition != 'receipt' ) {
          //detailsDisplayCall(orderNO,partyNames,staff,condition)
        // }else{
          // chan //
          partyDetailsCall(orderNO,partyNames,staff,condition,data)
        // }
        
        //saleCall()
  })
}//merchantDetailsCall
var pdfPartyData = null;
var pdfPartyCity = null;
function partyDetailsCall(orderNO,partyNames,staff,condition){
  db.subscribers.find({ "subscriber" : partyNames},function(err,partyData){
        console.log(" partyDetailsCall ")
        //console.log(partyData);
        pdfPartyData = partyData;
       
        console.log( pdfPartyData[0].data.address1);
        console.log( pdfPartyData[0].data.city1.id);
       var cityId = [ 
                      {"id": 1, "value": "Bengaluru", "type": "fps_city"},
                      {"id": 2, "value": "Mysore", "type": "fps_city"},
                      {"id": 3, "value": "Mangalore", "type": "fps_city"},
                      {"id": 4, "value": "Belgaum", "type": "fps_city"},
                      {"id": 5, "value": "Gulbarga", "type": "fps_city"},
                      {"id": 6, "value": "Davanagere", "type": "fps_city"},
                      {"id": 7, "value": "Bellary", "type": "fps_city"},
                      {"id": 8, "value": "Bijapur", "type": "fps_city"},
                      {"id": 9, "value": "Shimoga", "type": "fps_city"},
                      {"id": 10, "value": "Tumkur", "type": "fps_city"}
                   ]
        for (var i = cityId.length - 1; i >= 0; i--) {
            //console.log("city id "+cityId[i].id)
           
          if (pdfPartyData[0].data.city1.id == cityId[i].id ) {
             pdfPartyCity = cityId[i].value ;
             console.log(cityId[i].value+" "+cityId[i].id+" "+pdfPartyData[0].data.city1.id)
          };
        };

         if (condition != 'issueVoucher') {
               detailsDisplayCall(orderNO,partyNames,staff,condition)
         }else{
               //detailsDisplayCall(partyNames,staff,condition)
               pdfPrintCallIssueVoucher(partyNames)
         }
        
   
  })
}//partyDetailsCall
var detailsDisplay = null;
var taxAmount = 0;
var orderValue = 0;
var  voucherNo = null;
function detailsDisplayCall(orderNO,partyNames,staff,condition){
  //condition == 'receipt'
  detailsDisplay = null;
   voucherNo = null;
   taxAmount = 0;
   orderValue = 0;
   // commented to avoid missing data
  //transactionData = null;
  //
  if (condition == 'receipt') {
        db.transactionDetail.find({  "orderNo" : orderNO, "Transaction" : "Receipt Voucher" },function(err,detailsDisplayData){
            
            detailsDisplay = detailsDisplayData;
             voucherNo = detailsDisplayData[0].voucherNo ;
              console.log(voucherNo+"length to call in details  "+detailsDisplayData.length+detailsDisplayData[0].voucherNo);
              pdfPrintCallReceipt(orderNO,partyNames,staff,pdfPartyData[0].data.address1,voucherNo,false)
          
        })
  } else if (condition == 'issueVoucherPdfCall') {
        db.transactionDetail.find({  "refOrder" : orderNO,  "Transaction" : "Issue Voucher"},function(err,detailsDisplayData){
            
            detailsDisplay = detailsDisplayData;
             voucherNo = detailsDisplayData[0].voucherNo ;
             console.log(voucherNo+"length to call in details  "+detailsDisplayData.length+detailsDisplayData[0].voucherNo);
             pdfPrintCallIssueVoucherPdf(orderNO,partyNames,staff,pdfPartyData[0].data.address1,voucherNo)
          
        })
  
  } else if (condition == 'receiptVoucherPdfCall') {
        db.transactionDetail.find({  "refOrder" : orderNO,  "Transaction" : "Receipt Voucher"},function(err,detailsDisplayData){
            
            detailsDisplay = detailsDisplayData;
             voucherNo = detailsDisplayData[0].voucherNo ;
             console.log(voucherNo+"length to call in details  "+detailsDisplayData.length+detailsDisplayData[0].voucherNo);
             // not to call 
              pdfPrintCallReceipt(orderNO,partyNames,staff,pdfPartyData[0].data.address1,voucherNo,true)
          
        })
  
   

   }else if(condition == 'order'){
                transactionData = null;
                    db.receipts.find({ "orderNO" :orderNO },function(err,totalAmount){
                                if (totalAmount.length == 0) {
                                    cashAdvance = '' ;
                                }else{
                                    cashAdvance = totalAmount[0].PaidAmount ;
                               
                                }
                                // console.log(" totalAmount[0].PaidAmount totalAmount[0].PaidAmoun "+cashAdvance)
                      })

                   
                         
                    db.transactionDetail.find({ "orderNo" : orderNO},function(err,transaction){
                             console.log(" c "+"transactionData  transactionData  transactionData  transactionData  "+transaction.length)
                    
                                if (transaction.length == 0) {
                                   transactionData = null;
                                   ordersCall()
                                }else{
                                    transactionData = transaction;
                                    ordersCall()
                                       }
                                 console.log(" totalAmount[0].PaidAmount totalAmount[0].PaidAmoun "+transactionData)
                      })
                    function ordersCall() {
                           db.orders.find({ "orderNO" :orderNO },function(err,detailsDisplayData){
                                  console.log("length to call in details  "+detailsDisplayData.length);
                                  detailsDisplay = detailsDisplayData;
                                  //console.log(detailsDisplayData)
                                  for (var i = detailsDisplay.length - 1; i >= 0; i--) {
                                    //Things[i]
                                       orderValue  = orderValue + parseFloat(detailsDisplay[i].final)
                                      
                                       taxAmount = taxAmount + parseFloat(detailsDisplay[i].taxamt)
                                   
                                  };

                                  pdfPrintCall(orderNO,partyNames,staff,pdfPartyData[0].data.address1,transactionData)

                
                            })
                    }

  }else if(condition == 'onlyOrders'){
                    
                                   cashAdvance = '' ;
                                   transactionData = null;

                     db.orders.find({ "orderNO" :orderNO },function(err,detailsDisplayData){
                            console.log("length to call in details  "+detailsDisplayData.length);
                            detailsDisplay = detailsDisplayData;
                            //console.log(detailsDisplayData)
                            for (var i = detailsDisplay.length - 1; i >= 0; i--) {
                              //Things[i]
                                 orderValue  = orderValue + parseFloat(detailsDisplay[i].final)
                                
                                 taxAmount = taxAmount + parseFloat(detailsDisplay[i].taxamt)
                             
                            };

                            pdfPrintCall(orderNO,partyNames,staff,pdfPartyData[0].data.address1,transactionData)

          
                      })

  

  }else if (condition == 'amount') {

           db.receipts.find({ "orderNO" :orderNO },function(err,detailsDisplayData){
                            console.log("length to call in details  "+detailsDisplayData.length);
                            detailsDisplay = detailsDisplayData;
                            console.log(detailsDisplay)
                            // for (var i = detailsDisplay.length - 1; i >= 0; i--) {
                            //   //Things[i]
                            //      orderValue  = orderValue + parseFloat(detailsDisplay[i].final)
                                
                            //      taxAmount = taxAmount + parseFloat(detailsDisplay[i].taxamt)
                             
                            // };
                            pdfPrintCallAmount(orderNO,partyNames,staff,pdfPartyData[0].data.address1)
                             
                            //partyDetailsCall(orderNO,partyNames,staff)
                           // saleCall(orderNO,partyNames,staff)
                      })

  };


}//detailsDisplayCall()

//merchantDetailsCall();
//pdf trial end
app.post('/api/orderDetailsAmontAdvancePdf/:orderNo',function(req,res){ 
  var data =req.params.orderNo;
console.log(data)
var data_array=data.split(",");
    var mode=data_array[0];
  var amount=data_array[1];
  console.log(" order details pdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf ");
  console.log("  orderNo  orderNo  orderNo  orderNo "+ mode+amount);
  console.log("   end here  here /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf ");
    //merchantDetailsCall("OD6",'Vinay','staff','order');
  // merchantDetailsCall(req.body.orderNO,req.body.partyNames,'staff','order');
        setTimeout(function(){
          merchantDetailsCall(data_array[1],data_array[0],'staff','amount');
        },1000);
})

//pdf trial end
app.post('/api/orderDetailsOrdersPdf/:orderNo',function(req,res){ 
  var data =req.params.orderNo;
console.log(data)
var data_array=data.split(",");
    var orderNo = data_array[0];
  //var amount = data_array[1];
  console.log(" order details pdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf "+data_array[0]);
  //console.log("  orderNo  orderNo  orderNo  orderNo "+ mode+amount);
  console.log("   end here  here /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf ");
 // db.orders.find({},)
   db.orders.find({    "orderNO" : orderNo},function (err,orderData) {
      console.log(orderData)
       console.log("orderData[0].saleNames orderData[0].saleNames orderData[0].saleNames orderData[0].saleNames"+orderData[0].saleNames)
        console.log(orderData[0].partyNames)
        merchantDetailsCall(orderNo,orderData[0].partyNames,orderData[0].saleNames,'order');
   })

    //merchantDetailsCall("OD6",'Vinay','staff','order');
  // merchantDetailsCall(req.body.orderNO,req.body.partyNames,'staff','order');
       
        setTimeout(function(){
           console.log(fileNameOrder+" result fdyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy ")
  
         // merchantDetailsCall(data_array[1],data_array[0],'staff','order');
          res.json({'orderFile':fileNameOrder})
        },2000);
})
//pdf trial end
app.post('/api/orderDetailsOnlyOrdersPdf/:orderNo',function(req,res){ 
  var data =req.params.orderNo;
console.log(data)
var data_array=data.split(",");
    var orderNo = data_array[0];
  
 setTimeout(function(){
   db.orders.find({"orderNO" : orderNo},function (err,orderData) {
         console.log("orderData   console.log(orderData) ")
        console.log(orderData)
        console.log(orderData.partyNames)
        merchantDetailsCall(orderNo,orderData[0].partyNames,orderData[0].saleNames,'onlyOrders');
   })

 },500)


        setTimeout(function(){
           console.log(fileNameOrder+" result fdyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy ")
  
           // merchantDetailsCall(data_array[1],data_array[0],'staff','order');
           res.json({'orderFile':fileNameOrder})
        },1000)


     
})

//pdf trial end
app.post('/api/orderDetailsReceiptPdf/:orderNo',function(req,res){ 
        var data =req.params.orderNo;
       // res.json({})
      console.log(data)
      var data_array=data.split(",");
          var orderNo = data_array[0];
        setTimeout(function(){    
          //var amount = data_array[1];
          console.log(" Receipt order details pdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf "+data_array[0]);
          //console.log("  orderNo  orderNo  orderNo  orderNo "+ mode+amount);
          console.log("  Receipt end here  here /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf /api/orderDetailsAmontAdvancePdf ");
         // db.orders.find({},)
           db.transactionDetail.find({    "orderNo" : orderNo},function (err,orderData) {
              console.log(orderData)
              // console.log(" Receipt orderData[0].saleNames orderData[0].saleNames orderData[0].saleNames orderData[0].saleNames"+orderData[0].saleNames)
                //console.log(orderData[0].partyNames)
                merchantDetailsCall(orderNo,orderData[0].partyname,'staff','receipt');
           })
        }, 100);
        setTimeout(function(){    
              res.json(fileNameMaterialReceipt)
        }, 500);

   
})

//pdf trial end
app.post('/api/orderDetailsIssueVoucherCallPdf/:orderNo',function(req,res){ 
        var data =req.params.orderNo;
       // res.json({})
      console.log(data)
      var data_array=data.split(",");
          var orderNo = data_array[0];
         //var orderNo = 'OD102';

     setTimeout(function(){    
               db.transactionDetail.find({    "refOrder" : orderNo},function (err,orderData) {
                  console.log(orderData)
                  //"refOrder" : "OD122" console.log(" Receipt orderData[0].saleNames orderData[0].saleNames orderData[0].saleNames orderData[0].saleNames"+orderData[0].saleNames)
                    //console.log(orderData[0].partyNames)
                    merchantDetailsCall(orderNo,orderData[0].partyname,'staff','issueVoucherPdfCall');
               })
        }, 100);
     setTimeout(function(){    
              res.json(fileNameIssueVoucherPdf)
        }, 500);

   
})

//receiptVoucherPdfCall
app.post('/api/receiptVoucherPdfCall/:orderNo',function(req,res){ 
        var data =req.params.orderNo;
       // res.json({})
      console.log(data)
      var data_array=data.split(",");
          var orderNo = data_array[0];
         //var orderNo = 'OD102';

     setTimeout(function(){    
               db.transactionDetail.find({    "refOrder" : orderNo},function (err,orderData) {
                  console.log(orderData)
                  //"refOrder" : "OD122" console.log(" Receipt orderData[0].saleNames orderData[0].saleNames orderData[0].saleNames orderData[0].saleNames"+orderData[0].saleNames)
                    //console.log(orderData[0].partyNames)
                   // merchantDetailsCall(orderNo,orderData[0].partyname,'staff','receiptVoucherPdfCall');
               })
        }, 100);
     setTimeout(function(){    
              res.json(fileNameMaterialReceipt)
        }, 500);
  
})


app.post('/api/issueVoucherPdf',function(req,res){ 
  issueVoucherData = req.body ;
  console.log(" iiiiiiiiiiiiiiiiiiiiisssssssssssssssssssss ")
  console.log(req.body)
  //merchantDetailsCall(orderNO,partyNames,staff,condition,data)
   merchantDetailsCall('OD1',req.body.partyname,'staff','issueVoucher');
    setTimeout(function(){
           // console.log(fileNameOrder+" result fdyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy ")
  
         // merchantDetailsCall(data_array[1],data_array[0],'staff','order');
          res.json(fileNameIssueVoucher)

        },1500);    
})
function trialCall () {
    var orderNo = 'OD95';
 db.transactionDetail.find({    "refOrder" : orderNo},function (err,orderData) {
                  console.log(orderData)
                  //"refOrder" : "OD122" console.log(" Receipt orderData[0].saleNames orderData[0].saleNames orderData[0].saleNames orderData[0].saleNames"+orderData[0].saleNames)
                    //console.log(orderData[0].partyNames)
                    merchantDetailsCall(orderNo,orderData[0].partyname,'staff','receiptVoucherPdfCall');
               })
 
}
//trialCall () 
     
}//module.exports