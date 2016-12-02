var amqp = require('amqp')
    , util = require('util');

var login = require('./services/login');
var signup = require('./services/signup');

var host = require('./services/host');
var property = require('./services/property');

var user = require("./services/user");
var admin = require('./services/admin');

var cnn = amqp.createConnection({ host: '127.0.0.1' });

var connectionpool = require("./config/connectionpool");

process.on("SIGINT", function () {
    console.log("inside sigint process");
    connectionpool.closedbconnection();
});

process.on("close", function () {
    console.log("inside close process");
    connectionpool.closedbconnection();
});

cnn.on('ready', function () {
    console.log("listening to all queues");

    cnn.queue('userInfo_queue', function (q) {
        console.log("userInfo_queue");
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log("Message: " + JSON.stringify(message));
            user.get_profile_request(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('updateUserProfile_queue', function (q) {
        console.log("updateUserProfile_queue");
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log("Message: " + JSON.stringify(message));
            user.update_profile_request(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('login_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            login.handle_request(message, function (err, res) {
                console.log("inside login_queue handle request");
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('logout_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            console.log("logout_queue");
            login.handle_logout(message, function (err, res) {
                console.log("handle_logout");
                console.log("inside login_queue handle request");
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('register_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            signup.handle_request(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('becomehost1', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            console.log("become host step 1");
            host.becomehost_queue1(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('becomehost2', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            host.becomehost_queue2(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('becomehost3', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            host.becomehost_queue3(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('publishproperty', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            host.publishproperty(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('approve_host', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            admin.approvehost(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('searchbyuserid', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            property.searchbyuserid(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('gettoprevenue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            admin.gettoprevenue(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('searchbypropertyid', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            property.searchbypropertyid(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId

                });
            });
        });
    });


    cnn.queue('postuserreview', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            host.postuserreview(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('searchbyquery', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            property.searchbyquery(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('user_profile_image_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            user.user_profile_image_queue(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('searchAllProperties', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            property.searchAllProperties(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId

                });
            });
        });
    });


    cnn.queue('gethostrequests', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            admin.gethostrequests(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('searchbycity', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            property.searchbycity(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId

                });
            });
        });
    });
});