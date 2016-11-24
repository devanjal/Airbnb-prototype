//var connectionpool = require('./connectionpool');
var amqp = require('amqp')
    , util = require('util');

var login = require('./services/signup');
var host = require('./services/host');
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
    cnn.queue('becomehost1', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            console.log("become host step 1");
            host.becomehost_queue1(message, function(err,res){
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });
    cnn.queue('becomehost2', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            host.becomehost_queue2(message, function(err,res){
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });
    cnn.queue('becomehost3', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            host.becomehost_queue3(message, function(err,res){
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });
    cnn.queue('publishproperty', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            host.publishproperty(message, function(err,res){
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });
});