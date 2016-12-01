/**
 * Created by Nikhil-PC on 11/27/2016.
 */
var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');
router.get('/', function (req, res, next) {
    var msg_payload = {userid: req.session.user.id};
    mq_client.make_request('tripqueueuser', msg_payload, function (err, result) {
        if(err){
            console.log("Error in fetching trip "+err);
        }else {
            if (results.code == 200){
                console.log("trip got successfully");
                console.log(result);
                res.send(result);
            }else {
                console.log("No trips to update");
            }
        }
    });
});

router.post('/create', function (req, res) {
    //tripid auto-generated??
    // , userid:??
    // bill id add from the previous route
    var msg_payload = { hostid: req.session.user.id, propertyid: req.body.propertyid,
        userid: req.body.userid,
        quantity: req.body.quantity,
        from_date: req.body.from_date,
        to_date: req.body.to_date};

    mq_client.make_request('tripqueue', msg_payload, function (err, results) {
        console.log(results);
        if(err){
            console.log("Error in inserting trip data"+ err);
        }else {
            if (results.code == 200){
                console.log("trip created successfully");
            }else {
                console.log("No trips to add");
            }
        }
    });
});

router.post('/edit', function (req, res) {
    var msg_payload = { trip_id: req.body.trip_id, quantity: req.body.quantity, from_date: req.body.from_date, to_date: req.body.to_date};
    mq_client.make_request('tripqueue', msg_payload, function (err, result) {
        if(err){
            console.log("Error in updating your trip "+err);
        }else {
            if (results.code == 200){
                console.log("trip updated successfully");
                res.send(result);
            }else {
                console.log("No trips to update");
            }
        }
    });
});

router.get('/gettripsbyuserid', function (req, res) {

});

router.get('/gettripsbyhostid', function (req, res) {
    var msg_payload = {hostid: req.session.user.id};
    mq_client.make_request('tripqueuehost', msg_payload, function (err, result) {
        if(err){
            console.log("Error in updating your trip "+err);
        }else {
            if (results.code == 200){
                console.log("trip updated successfully");
                res.send(result);
            }else {
                console.log("No trips to update");
            }
        }
    });
});

module.exports = router;