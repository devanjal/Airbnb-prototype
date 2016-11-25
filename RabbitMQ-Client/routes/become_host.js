var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');
var multer	=	require('multer');

var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname/*file.fieldname + '-' + Date.now()*/);
    }
});
var upload = multer({ storage : storage }).array('userPhoto',5);

router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/step1', function(req, res, next) {
    console.log('become host');
    var payload = {};
    payload.hostid = req.session.user_id;
    payload.category = req.body.category;
    payload.quantity = parseInt(req.body.quantity);
    payload.address = req.body.address;
    payload.city = req.body.city;
    payload.state = req.body.state;
    payload.country = req.body.country;
    payload.zipcode = req.body.zipcode;
    payload.published = 'false';

    mq_client.make_request('becomehost1',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                req.session.property_id = results.property_id;
                res.send({status:'success'});
            }
            else {
                console.log("Invalid signup... record duplication");
                res.send({status:'error',error:"value updation failed"});
            }
        }
    });
});
router.post('/step2', function(req, res, next) {
    upload(req,res,function(err) {
        console.log(req.body);
        console.log(req.files);
        if(err) {
            return res.end("Error uploading file.");
        }
        var payload = {};
        payload.hostid = req.session.user_id;
        payload.propertyid = req.session.property_id;
        payload.title = req.body.title;
        payload.description = req.body.description;
        payload.filenames = [];
        for(i = 0; i < req.files.length; i++)
        {
            payload.filenames.push('/images/'+req.files[i].filename);
        }
        mq_client.make_request('becomehost2',payload, function(err,results){
            if(err){
                return done(err);
            }
            else
            {
                if(results.code == 200){
                    console.log('response from server');
                    //to do redirect to some page
                    res.send({status:'success'});
                }
                else {
                    res.send({status:'error',error:"value updation failed"});
                }
            }
        });
    });

});
router.post('/step3', function(req, res, next) {
    var payload = {};
    payload.hostid = req.session.user_id;
    payload.propertyid = req.session.property_id;
    payload.bid_price = parseFloat(req.body.bid_price);
    payload.price = parseFloat(req.body.price);
    payload.availability_from = new Date(req.body.availability_from);
    payload.availability_to = new Date(req.body.availability_to);
    mq_client.make_request('becomehost3',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                console.log('response from server');
                //to do redirect to some page
                res.send({status:'success'});
            }
            else {
                res.send({status:'error',error:"value updation failed"});
            }
        }
    });
});
router.post('/publish', function(req, res, next) {
    var payload = {};
    payload.propertyid = req.session.property_id;
    mq_client.make_request('publishproperty',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                res.send({status:'success'});            }
            else {
                res.send({status:'error',error:'profile was not published'});
            }
        }
    });
});
module.exports = router;
