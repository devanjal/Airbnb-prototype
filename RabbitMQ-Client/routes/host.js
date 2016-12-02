var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

router.get('/', function (req, res) {
    res.send('host module is up');
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

router.post('/gethostbyarea', function (req, res) {
    var location = req.body.location;
    var msg_payload = { "location": location };
    mq_client.make_request('gethostbyarea', msg_payload, function (err, results) {
        if (err) {
            res.send({status:'error'});
            return;
        }
        if(results.code == 200){
            res.send(results.value);
        }
        else {
            res.send({status:'error',error:results.error});
        }
    });
});

module.exports = router;