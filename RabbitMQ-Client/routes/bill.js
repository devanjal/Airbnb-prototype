var ejs=require('ejs');
var session = require('express-session');
var mysql= require('./mysql');
exports.bill_gen=function(req,res){

    var user_id=req.body.user_id;
    var host_id=req.body.host_id;
    var property_id=req.body.property_id;
    var from_date=req.body.from_date;
    var to_date=req.body.to_date;
    var location=req.body.location;
    var category=req.body.category;
    var no_of_guest=req.body.no_of_guest;
    var security_deposite=req.body.security_deposite;
    var amount=req.body.amount;

  var bill_gen='insert into bill (user_id,host_id,property_id, from_date, to_date, location,' +
      'no_of_guest,amount,date,security_deposite,category) values("'+user_id+'","'+host_id+'",' +
      '"'+property_id+'","'+from_date+'","'+to_date+'","'+location+'","'+no_of_guest+'","'+amount+'",now(),' +
      '"'+security_deposite+'","'+category+'")';
    mysql.fetchData(bill_gen,function(err,result){
        if(err){
            console.log("UnSuccess Bill")
            res.send("401")
        }
        else{
            console.log("Success Bill")
            res.send("200")
        }

    });


};
exports.getBill=function (req,res) {
    var user_id=req.body.user_id;
    var getBill='select *from bill where user_id="'+user_id+'"';
    mysql.fetchData(getBill,function(err,result){
        if(err){
            console.log("UnSuccess Bill")
            res.send("401")
        }
        else{
            console.log("Success Bill")
            res.send(result)
        }

    });
}