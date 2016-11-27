var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');


router.post('/createBill',function(req,res){


    var payload = {};
    payload.b=req.body;
    payload.user_id=req.session.user_id;
    console.log("before que");

    mq_client.make_request('createBillQueue', payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                res.send({status:'success'});
            }
            else {
                res.send({status:'error',error:"Bill creation Failed"});
            }
        }
    });
});

//    var bill_gen='insert into bill (user_id,host_id,property_id, from_date, to_date, location, no_of_guest,amount,date,security_deposite,category) values("'+user_id+'","'+host_id+'",' +
//       '"'+property_id+'","'+from_date+'","'+to_date+'","'+location+'","'+no_of_guest+'","'+amount+'",now(),' +
//      '"'+security_deposite+'","'+category+'")';
//   //   mysql.fetchData(bill_gen,function(err,result){
//   //       if(err){
//   //           console.log("UnSuccess Bill");
//   //           res.send({status:'error',error:"Bill creation error"});
//   //       }
//   //       else{
//   //           console.log("Success Bill");
//   //           res.send({status:'success'});
//   //       }
//   //
//   //   });
// //
// //
// });
router.post('/get',function (req,res) {
    var user_id=req.body.user_id;
    var getBill='select *from bill where user_id="'+user_id+'"';
    mysql.fetchData(getBill,function(err,result){
        if(err){
            console.log("UnSuccess Bill");
            res.send({status:'error',error:"Error in bill search"});
        }
        else{
            console.log("Success Bill")
            res.send(result)
        }

    });
});
module.exports = router;