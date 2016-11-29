var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

router.get('/', function (req, res) {
    res.send('admin module is up');
});

router.post('/approvehost', function (req, res) {
    var user_id = req.body.hostid;
    //var user_id = 15;
    var msg_payload = { "id": user_id };
    mq_client.make_request('approve_host', msg_payload, function (err, results) {
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
router.post('/gettoprevenue', function (req, res) {
    var type = req.body.type;
    //var user_id = 15;
    var msg_payload = { "type": type };
    mq_client.make_request('gettoprevenue', msg_payload, function (err, results) {
        if (err) {
            res.send({status:'error'});
            return;
        }
        if(results.code == 200){
            res.send({status:'success',value:results.value});
        }
        else {
            res.send({status:'error',error:"query failed"});
        }
    });
});

router.post('/gethostrequests', function (req, res) {
    var user_id = req.body.hostid;
    //var user_id = 15;
    var msg_payload = {  };
    mq_client.make_request('gethostrequests', msg_payload, function (err, results) {
        if (err) {
            res.send({status:'error'});
            return;
        }
        if(results.code == 200){
            res.send(results);
        }
        else {
            res.send({status:'error',error:"Unable to fetch data"});
        }
    });
});

module.exports = router;