/**
 * Created by Nikhil-PC on 11/28/2016.
 */
var connectionpool = require('../config/connectionpool');
function createTrip(msg, callback){
    var res = {};
    connectionpool.getConnection(function (err, connection) {
       if(err){
           console.log("Error connecting to db" + err);
           connectionpool.releaseSQLConnection(connection);
           return;
       }
        connection.query('insert into `trips`(hostid, userid, propertyid, address, category, quantity, fromdate, todate, tripstatus) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [msg.hostid, msg.userid, msg.propertyid, msg.address, msg.category, msg.quantity, msg.from_date, msg.to_date, 'pending'], function (err, result) {
                if(err){
                    console.log("Error in inserting to trips "+err);
                    connectionpool.releaseSQLConnection(connection);
                    res.code = 401;
                    res.value = err.code;
                }
                else if (result) {
                    res.code = 200;
                    res.status = "success";
                } else {
                    res.code = 401;
                }
                callback(null, res);
                connectionpool.releaseSQLConnection(connection);
            });
    });
}

function editTrip(msg, callback) {
    console.log("editTrip");
    console.log(JSON.stringify(msg));
    var res = {};
    connectionpool.getConnection(function (err, connection) {
        if(err){
            console.log("Error connecting to db" + err);
            connectionpool.releaseSQLConnection(connection);
            return;
        }
        connection.query('Update `trips` set quantity=?, fromdate=?, todate=? where tripid=?', [msg.quantity, msg.fromdate, msg.todate, msg.tripid],
        function (err, result) {
            if(err){
                console.log("Error in updating trips "+err);
                connectionpool.releaseSQLConnection(connection);
                res.code = 401;
                res.value = err.code;
            }else if (result) {
                res.code = 200;
                res.status = "success";
            } else {
                res.code = 401;
            }
            callback(null, res);
            connectionpool.releaseSQLConnection(connection);
        });
    });
}
function getAllTripsByUserId(msg, callback) {
    var res = {};
    connectionpool.getConnection(function (err, connection) {
        if(err){
            console.log("Error connecting to db" + err);
            connectionpool.releaseSQLConnection(connection);
            return;
        }
        //select t.quantity, t.fromdate, t.todate, t.tripstatus, p.category, p.address, p.city, p.state, p.country, p.zipcode, p.title, p.price from trips as t inner join properties as p where t.propertyid = p.propertyid and t.userid = ?;
        connection.query('select t.tripid, t.quantity, t.fromdate, t.todate, t.tripstatus, p.category, p.address, p.city, p.state, p.country, p.zipcode, p.title, p.price from trips as t inner join properties as p where t.propertyid = p.propertyid and t.userid = ?',
                        [msg.userid],
            function (err, result) {
                if(err){
                    console.log("Error in fetching user trips "+err);
                    connectionpool.releaseSQLConnection(connection);
                    res.code = 401;
                    res.value = err.code;
                }else if (result) {
                    res.code = 200;
                    res.data = result;
                    res.status = "success";
                } else {
                    res.code = 401;
                    res.data = null;
                }
                callback(null, res);
                connectionpool.releaseSQLConnection(connection);
            });
    });
}

function getAllTripsByHostId(msg, callback) {
    var res = {};
    connectionpool.getConnection(function (err, connection) {
        if(err){
            console.log("Error connecting to db" + err);
            connectionpool.releaseSQLConnection(connection);
            return;
        }
        connection.query('select t.tripid, t.quantity, t.fromdate, t.todate, t.tripstatus, p.category, p.address, p.city, p.state, p.country, p.zipcode, p.title, p.price from trips as t inner join properties as p where t.propertyid = p.propertyid and t.hostid = ?',
                        [msg.hostid],
            function (err, result) {
                if(err){
                    console.log("Error in fetching user trips "+err);
                    connectionpool.releaseSQLConnection(connection);
                    res.code = 401;
                    res.value = err.code;
                }else if (result) {
                    res.code = 200;
                    res.data = result;
                    res.status = "success";
                } else {
                    res.code = 401;
                    res.data = null;
                }
                callback(null, res);
                connectionpool.releaseSQLConnection(connection);
            });
    });
}
function getTripByUserId(msg, callback) {
    var res = {};
    connectionpool.getConnection(function (err, connection) {
        if(err){
            console.log("Error connecting to db" + err);
            connectionpool.releaseSQLConnection(connection);
            return;
        }
        connection.query('Select t.tripid, t.quantity, t.fromdate,  t.todate, p.title, p.price, p.category, p.address, p.city, p.state, p.country, p.zipcode from trips as t inner join properties as p where t.propertyid = p.propertyid and t.tripid=?',
        [msg.tripid],
        function (err, result) {
            if(err){
                console.log("Error in fetching user trips by userid "+err);
                connectionpool.releaseSQLConnection(connection);
                res.code = 401;
                res.value = err.code;
            }else if (result) {
                res.code = 200;
                res.data = result;
                res.status = "success";
            } else {
                res.code = 401;
                res.data = null;
            }
            callback(null, res);
            connectionpool.releaseSQLConnection(connection);
        });
    });
}
function cancelTrip(msg, callback) {
    var res = {};
    connectionpool.getConnection(function (err, connection) {
        if(err){
            console.log("Error connecting to db" + err);
            connectionpool.releaseSQLConnection(connection);
            return;
        }
        connection.query('Update `trips` set tripstatus=? where tripid=?',
            ['canceled', msg.tripid],
            function (err, result) {
                if(err){
                    console.log("Error in canceling user trip "+err);
                    connectionpool.releaseSQLConnection(connection);
                    res.code = 401;
                    res.value = err.code;
                }else if (result) {
                    res.code = 200;
                    res.status = "success";
                } else {
                    res.code = 401;
                }
                callback(null, res);
                connectionpool.releaseSQLConnection(connection);
            });
    });
}
exports.getAllTripsByHostId = getAllTripsByHostId;
exports.getAllTripsByUserId = getAllTripsByUserId;
exports.getTripByUserId = getTripByUserId;
exports.createTrip = createTrip;
exports.editTrip = editTrip;
exports.cancelTrip = cancelTrip;