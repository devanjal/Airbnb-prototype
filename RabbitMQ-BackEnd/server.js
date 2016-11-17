//var connectionpool = require('./connectionpool');
var amqp = require('amqp')
    , util = require('util');

var login = require('./services/signup');

var cnn = amqp.createConnection({host:'127.0.0.1'});
process.on('SIGINT', function() {
    //connectionpool.closedbconnection();
});
process.on('close', function() {
    //connectionpool.closedbconnection();
});
cnn.on('ready', function(){
    console.log("listening to all queues");
    cnn.queue('register_queue', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            login.handle_signup(message, function(err,res){
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });
});