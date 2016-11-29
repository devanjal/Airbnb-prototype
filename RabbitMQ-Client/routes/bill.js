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
router.get('/getBill',function (req,res) {

    var payload={};
    payload.user_id=req.session.user_id;
    console.log("Getting the bills");
    mq_client.make_request('getBillQueue', payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
             //   console.log(results);
                res.send({status:'success', result:results.result});
            }
            else {
                res.send({status:'error',error:"Get bills Failed"});
            }
        }
    });

});
module.exports = router;