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
module.exports = router;