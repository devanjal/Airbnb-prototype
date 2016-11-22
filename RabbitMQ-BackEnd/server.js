//var connectionpool = require('./connectionpool');
var amqp = require('amqp')
    , util = require('util');

var login = require('./services/signup');
var profile=require('./services/profile')
console.log("running");
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
    cnn.queue('profile_queue',function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            switch(message.type)
            {
                case 'profile':
                    profile.setProfile(message,function(err,res){
                        cnn.publish(m.replyTo, res, {
                            contentType:'application/json',
                            contentEncoding:'utf-8',
                            correlationId:m.correlationId
                        });
                    });
                    break;
                case 'viewprofile':
                    profile.getProfile(message,function(err,res){
                        cnn.publish(m.replyTo, res, {
                            contentType:'application/json',
                            contentEncoding:'utf-8',
                            correlationId:m.correlationId
                        });
                    });
                    break;
                case 'checkprofile':
                    profile.checkProfile(message,function(err,res){
                        cnn.publish(m.replyTo, res, {
                            contentType:'application/json',
                            contentEncoding:'utf-8',
                            correlationId:m.correlationId
                        });
                    });
                    break;
            }
        })
    });
});