/**
 * Created by Venkatesh on 11/21/2016.
 */
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

router.post('/becomehost1', function(req, res, next) {
    console.log('become host');
    var payload = {};
    //payload.hostid = req.session.userid;
    payload.hostid = 1;
    payload.category = req.body.category;
    //payload.propertykind = req.body.propertykind;
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
                console.log('response from server');
                //to do redirect to some page
                res.send("values updated  successfully");
            }
            else {
                console.log("Invalid signup... record duplication");
                res.send("value updation failed");
            }
        }
    });
});
router.post('/becomehost2', function(req, res, next) {

    upload(req,res,function(err) {
        console.log(req.body);
        console.log(req.files);
        if(err) {
            return res.end("Error uploading file.");
        }
        var payload = {};
        //payload.hostid = req.session.userid;
        payload.hostid = 1;
        payload.title = req.body.title;
        payload.description = req.body.description;
        payload.availability = new Date(req.body.availability)
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
                    res.end("values updated  successfully");
                }
                else {
                    console.log("Invalid signup... record duplication");
                    res.end("value updation failed");
                }
            }
        });
        //res.end("File is uploaded");
    });

});
router.post('/becomehost3', function(req, res, next) {
    var payload = {};
   // payload.hostid = req.session.userid;
    payload.hostid = 1;
    payload.bid = req.body.bid;
    payload.price = parseFloat(req.body.price);
    //payload.propertykind = req.body.propertykind;
    console.log(req.body.noticeneeded);
    payload.noticeneeded = parseInt(req.body.noticeneeded);
    mq_client.make_request('becomehost3',payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                console.log('response from server');
                //to do redirect to some page
                res.send("values updated  successfully");
            }
            else {
                console.log("Invalid signup... record duplication");
                res.send("value updation failed");
            }
        }
    });
});
router.post('/publish', function(req, res, next) {
    mq_client.make_request('publishproperty',{}, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                console.log('response from server');
                //to do redirect to some page
                res.send("values updated  successfully");
            }
            else {
                console.log("Invalid signup... record duplication");
                res.send("value updation failed");
            }
        }
    });
});
module.exports = router;
