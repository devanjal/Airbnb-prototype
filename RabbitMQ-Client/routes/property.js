var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/searchbyuserid', function(req, res, next) {
    console.log(req.session.user.id);
    console.log('search by user id');
    var payload = {};
// <<<<<<< HEAD
    //payload.userid = req.session.user.id;
    payload.userid = req.session.user.id;
// =======
//     payload.userid = 12;
// >>>>>>> origin/anushka

    mq_client.make_request('searchbyuserid',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                res.send(results);
            }
            else {
                console.log("Invalid signup... record duplication");
                res.send({status:'error',error:"value updation failed"});
            }
        }
    });
});

router.post('/searchbypropertyid', function(req, res, next) {
    console.log('search by property id');

    var payload = {};
    payload.propertyid = parseInt(req.body.id);

    mq_client.make_request('searchbypropertyid',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                res.send(results);
            }
            else {
                console.log("Invalid signup... record duplication");
                res.send({status:'error',error:"value updation failed"});
            }
        }
    });
});

router.post('/searchbyquery', function(req, res, next) {
    console.log('search by search query');

    var payload = {};
    payload.city = req.body.city;
    payload.state=req.body.state;
    payload.checkin=req.body.checkin;
    payload.checkout=req.body.checkout;
    var guestsCount= req.body.guests.split(" ");
    console.log(guestsCount[0]);
    payload.guests=guestsCount[0];

    mq_client.make_request('searchbyquery',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                console.log("this is value:" + JSON.stringify(results));
                res.send(results);
            }
            else {
                console.log("Invalid signup... record duplication");
                res.send({status:'error',error:"value updation failed"});
            }
        }
    });
});

router.post('/searchAllProperties', function(req, res, next) {
    console.log('search all property');

    var payload = {};

    mq_client.make_request('searchAllProperties',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                res.send(results);
            }
            else {
                console.log("Invalid signup... record duplication");
                res.send({status:'error',error:"value updation failed"});
            }
        }
    });
});

router.post('/searchbycity', function(req, res, next) {
    console.log('search by city');

    var payload = {};
    payload.city = req.body.city;
    payload.state=req.body.state;

    mq_client.make_request('searchbycity',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                res.send(results);
            }
            else {
                console.log("Invalid signup... record duplication");
                res.send({status:'error',error:"value updation failed"});
            }
        }
    });
});

router.post('/searchbycategory', function(req, res, next) {
    console.log('search by room category');

    var payload = {};
    payload.city = req.body.city;
    payload.state=req.body.state;
    payload.category = req.body.category;

    mq_client.make_request('searchbycategory',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                res.send(results);
            }
            else {
                console.log("Invalid signup... record duplication");
                res.send({status:'error',error:"value updation failed"});
            }
        }
    });
});


module.exports = router;
