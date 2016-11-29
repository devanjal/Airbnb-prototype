var connectionpool = require('../config/connectionpool');

function becomehost_step1(msg, callback){
    var res = {};
    console.log(JSON.stringify(msg));
    connectionpool.getConnection(function(err,connection) {
        if (err) {
            connectionpool.releaseSQLConnection(connection);
            res.code = 401;
            res.value = "Error connecting to Db";
            callback(null, res);
            return;
        }

        var query = connection.query('INSERT INTO properties SET ?', msg , function (err, result) {
                if (err) {
                    console.log(err);
                    res.code = 401;
                    res.value = "Step1 failed";
                    callback(null, res);
                    connectionpool.releaseSQLConnection(connection);
                    return;
                }
                connection.query('select max(propertyid) as propertyid from properties',[], function(err, rows, fields) {
                    if (!err)
                    {
                        console.log('The solution is: '+ rows.length + ' ' + JSON.stringify(rows[0]));
                        connectionpool.releaseSQLConnection(connection);
                        res.code = 200;
                        res.property_id = rows[0].propertyid;
                        res.value = "Step1 succeeded";
                        callback(null, res);
                        //res.send(rows);
                    }
                    else
                    {
                        console.log('Error while performing Query.');
                        res.code = 401;
                        res.value = "Step1 failed";
                        callback(null, res);
                        connectionpool.releaseSQLConnection(connection);
                    }
                });
            });
    });
};
function becomehost_step2(msg, callback){
    console.log(JSON.stringify(msg));
    var res = {};
    connectionpool.getConnection(function(err,connection){
        if(err){
            connectionpool.releaseSQLConnection(connection);
            res.code = 401;
            res.value = "Error connecting to Db";
            callback(null, res);
            return;
        }
        connection.query(
            'UPDATE properties SET title = ?, description = ? where propertyid = ?',
            [msg.title,msg.description,msg.propertyid],
            function (err, result) {
                if (err)
                {
                    //console.log(err);
                    res.code = 401;
                    res.value = "Step2 failed";
                    callback(null, res);
                    connectionpool.releaseSQLConnection(connection);
                    return;
                }
                // var post = {};
                // post.hostid = msg.hostid;
                // post.images = msg.filenames;

                var mongoconnection = connectionpool.getdbconnection();
                mongoconnection.collection('properties').update({propertyid:msg.propertyid},{$push:{images:{$each:msg.filenames}}, $set:{hostid : msg.hostid}} , {upsert:true},function(err, result) {
                //connection.collection('properties').insertOne(post, function(err, result) {
                    if(err) {
                        console.log(err);
                        res.code = 400;
                        res.value = err.name + " " + err.message;
                        connectionpool.releaseSQLConnection(connection);
                        callback(null, res);
                        return;
                    }
                    res.code = 200;
                    res.value = "Step2 updated";
                    connectionpool.releaseSQLConnection(connection);
                    callback(null, res);
                });
            });
    });
};
function becomehost_step3(msg, callback){
    var res = {};
    connectionpool.getConnection(function(err,connection){
        if(err){
            connectionpool.releaseSQLConnection(connection);
            res.code = 401;
            res.value = "Error connecting to Db";
            callback(null, res);
            return;
        }
        connection.query(
            'UPDATE properties SET bid_price = ?, price = ?, availability_from = ?,availability_to = ? Where propertyid = ?',
            [msg.bid_price,msg.price,new Date(msg.availability_from),new Date(msg.availability_to),msg.propertyid],
            function (err, result) {
                if (err)
                {
                    res.code = 401;
                    res.value = "Step3 failed";
                    callback(null, res);
                    console.log(err);
                    connectionpool.releaseSQLConnection(connection);
                    return;
                }
                //--
                res.code = 200;
                res.value = "Step3 succeeded";
                callback(null, res);
                connectionpool.releaseSQLConnection(connection);
                //--
            });
    });
};

function publishproperty(msg, callback){
    var res = {};
    console.log(JSON.stringify(msg));
    connectionpool.getConnection(function(err,connection) {
        if (err) {
            connectionpool.releaseSQLConnection(connection);
            res.code = 401;
            res.value = "Error connecting to Db";
            callback(null, res);
            return;
        }

        connection.query(
            'UPDATE properties SET published = ? where propertyid = ?',
            ['true',msg.propertyid],
            function (err, result) {
                if (err)
                {
                    console.log(err);
                    res.code = 401;
                    res.value = "profile publishing failed";
                    callback(null, res);
                    connectionpool.releaseSQLConnection(connection);
                    return;
                }
                res.code = 200;
                res.value = "profile published";
                callback(null, res);

                //--
                connectionpool.releaseSQLConnection(connection);
                //--
            });
    });
};
exports.becomehost_queue1 = becomehost_step1;
exports.becomehost_queue2 = becomehost_step2;
exports.becomehost_queue3 = becomehost_step3;
exports.publishproperty = publishproperty;