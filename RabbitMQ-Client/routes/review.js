var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');


router.post('/makeuserreview', function(req, res) {
    console.log('become host');
    var payload = {};
    console.log(JSON.stringify(req.body));
    //payload.hostid = req.session.user.id;
    payload.hostid = 4;
    payload.userid = parseInt(req.body.user_id);
    payload.starrating = parseInt(req.body.starrating);
    payload.review = req.body.review;
    payload.hostname = 'venkatesh';//req.body.review;

    mq_client.make_request('makeuserreview',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                res.send({status:'success'});
            }
            else {
                res.send({status:'error',error:"value updation failed"});
            }
        }
    });
});

router.post('/makehostreview', function(req, res) {
    console.log('become host');
    var payload = {};
    console.log(JSON.stringify(req.body));
    payload.hostid = parseInt(req.body.host_id);
    payload.userid = 4 //req.session.user.id;
    payload.starrating = parseInt(req.body.starrating);
    payload.review = req.body.review;
    payload.username = 'venkatesh';//req.body.review;

    mq_client.make_request('makehostreview',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                res.send({status:'success'});
            }
            else {
                res.send({status:'error',error:"value updation failed"});
            }
        }
    });
});

router.post('/makepropertyreview', function(req, res) {
    console.log('become host');
    var payload = {};
    console.log(JSON.stringify(req.body));
    payload.propertyid = parseInt(req.body.property_id);
    payload.userid = 4 ;//req.session.user.id;
    payload.starrating = parseInt(req.body.starrating);
    payload.review = req.body.review;
    payload.username = 'venkatesh';//req.body.review;

    mq_client.make_request('makepropertyreview',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                res.send({status:'success'});
            }
            else {
                res.send({status:'error',error:"value updation failed"});
            }
        }
    });
});


module.exports = router;

