var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');


router.get('/', function (req, res) {
    res.send('admin module is up');
});

router.post('/postuserreview', function (req, res) {
    var user_id = req.body.userid;
    //var user_id = 15;
    var msg_payload = { "id": user_id };
    mq_client.make_request('postuserreview', msg_payload, function (err, results) {
        if (err) {
            res.send({status:'error'});
            return;
        }
        if(results.code == 200){
            res.send({status:'success'});
        }
        else {
            res.send({status:'error',error:"value updation failed"});
        }
    });
});

router.post('/searchbyid', function(req, res, next) {

    console.log('search by id');

    var payload = {};
    //payload.userid = req.session.user.id;
    payload.userid = 12;

    mq_client.make_request('searchbyid',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                res.send({status:'success'});
            }
            else {
                console.log("Invalid signup... record duplication");
                res.send({status:'error',error:"value updation failed"});
            }
        }
    });
});
module.exports = router;

