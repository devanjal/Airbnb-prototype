var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

router.post('/', function(req, res, next) {
    res.send('respond with a resource');
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
