var connectionpool = require('./connectionpool');

function searchbypropertyid(msg, callback){
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
            'SELECT * from properties as p, users as u WHERE u.id=p.hostid and p.propertyid=?',[msg.propertyid],
            function(err, rows, fields) {

                if (err)
                {
                    console.log(err);
                    res.code = 401;
                    res.value = "searching host by id failed";
                    callback(null, res);
                    connectionpool.releaseSQLConnection(connection);
                    return;
                }
                // res.code = 200;
                res.value = rows;
                console.log("This is value of rows:--" + rows);
                var mongoconnection = connectionpool.getdbconnection();
                mongoconnection.collection('properties').find({propertyid:msg.propertyid}).toArray(function(err, result) {
                    //connection.collection('properties').insertOne(post, function(err, result) {
                    if(err) {
                        console.log(err);
                        res.code = 400;
                        res.value = err;
                        connectionpool.releaseSQLConnection(connection);
                        callback(null, res);
                        return;
                    }
                    console.log('test');
                    console.log(JSON.stringify(result));
                    res.code = 200;
                    res.mongoval = result;
                    //res.value = result;
                    connectionpool.releaseSQLConnection(connection);
                    callback(null, res);
                });
                // callback(null, res);
            });

    });
};

function searchbyuserid(msg, callback){
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
            'SELECT * from properties WHERE hostid=?',[msg.userid],
            function(err, rows, fields) {

                if (err)
                {
                    console.log(err);
                    res.code = 401;
                    res.value = "searching host by id failed";
                    callback(null, res);
                    connectionpool.releaseSQLConnection(connection);
                    return;
                }
                // res.code = 200;
                res.value = rows;
                var mongoconnection = connectionpool.getdbconnection();
                mongoconnection.collection('properties').find({hostid:msg.userid}).toArray(function(err, result) {
                    //connection.collection('properties').insertOne(post, function(err, result) {
                    if(err) {
                        console.log(err);
                        res.code = 400;
                        res.value = err;
                        connectionpool.releaseSQLConnection(connection);
                        callback(null, res);
                        return;
                    }
                    console.log('test');
                    console.log(JSON.stringify(result));
                    res.code = 200;
                    res.mongoval = result;
                    //res.value = result;
                    connectionpool.releaseSQLConnection(connection);
                    callback(null, res);
                });
                // callback(null, res);
            });

    });
};

function searchAllProperties(msg, callback){
    var res = {};
    var arr= new Array();
    var result=new Array();
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
            'SELECT * from properties as p, users as u where u.id=p.hostid', function(err, rows, fields) {

                if (err)
                {
                    console.log(err);
                    res.code = 401;
                    res.value = "searching by text string failed";
                    callback(null, res);
                    connectionpool.releaseSQLConnection(connection);
                    return;
                }
                res.code = 200;
                res.value = rows;
                //console.log("This is rows value:" + JSON.stringify(rows));
                for(var i=0;i<rows.length;i++) {
                    //console.log("This is value of id:" + rows[i].propertyid);
                    arr.push(rows[i].propertyid);
                    //console.log("This is value of arr:" + arr);
                    //res.value=rows;
                }
                var mongoconnection = connectionpool.getdbconnection();
                mongoconnection.collection('properties').find({propertyid:{$in:arr}}).toArray(function(err, result) {
                    if (err) {
                        console.log(err);
                        res.code = 400;
                        res.value = err;
                        connectionpool.releaseSQLConnection(connection);
                        callback(null, res);
                        return;
                    }
                    //console.log('test');
                    //console.log("This is value of result:" + JSON.stringify(result));
                    // res.code = 200;
                    res.mongoval = result;
                    //arr1=result;
                    //res.value = result;
                    connectionpool.releaseSQLConnection(connection);
                    //res.value=arr[i];
                    for(var i=0;i<rows.length;i++){
                        rows[i].images = [];
                        for(var j=0;j<result.length; j++){
                            if(rows[i].propertyid==result[j].propertyid){
                                rows[i].images=result[j].images;
                            }
                        }
                    }
                    callback(null, res);
                });
            });
    });
}

function searchbyquery(msg, callback){
    var res = {};
    var arr= new Array();
    var result=new Array();
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
            'SELECT * from properties WHERE city=? and availability_from =? and availability_to =? and quantity =?',[msg.city, msg.dateFrom, msg.dateTo, msg.guests],
            function(err, rows, fields) {

                if (err)
                {
                    console.log(err);
                    res.code = 401;
                    res.value = "searching by text string failed";
                    callback(null, res);
                    connectionpool.releaseSQLConnection(connection);
                    return;
                }
                res.code = 200;
                res.value = rows;
                //console.log("This is rows value:" + JSON.stringify(rows));
                for(var i=0;i<rows.length;i++) {
                    //console.log("This is value of id:" + rows[i].propertyid);
                    arr.push(rows[i].propertyid);
                    //console.log("This is value of arr:" + arr);
                    //res.value=rows;
                }
                var mongoconnection = connectionpool.getdbconnection();
                mongoconnection.collection('properties').find({propertyid:{$in:arr}}).toArray(function(err, result) {
                    if (err) {
                        console.log(err);
                        res.code = 400;
                        res.value = err;
                        connectionpool.releaseSQLConnection(connection);
                        callback(null, res);
                        return;
                    }
                    //console.log('test');
                    //console.log("This is value of result:" + JSON.stringify(result));
                    // res.code = 200;
                    res.mongoval = result;
                    //arr1=result;
                    //res.value = result;
                    connectionpool.releaseSQLConnection(connection);
                    //res.value=arr[i];
                    for(var i=0;i<rows.length;i++){
                        rows[i].images = [];
                        for(var j=0;j<result.length; j++){
                            if(rows[i].propertyid==result[j].propertyid){
                                rows[i].images=result[j].images;
                            }
                        }
                    }
                    callback(null, res);

                });



            });

    });
}
exports.searchAllProperties=searchAllProperties;
exports.searchbyquery= searchbyquery;
exports.searchbyuserid = searchbyuserid;
exports.searchbypropertyid = searchbypropertyid;
