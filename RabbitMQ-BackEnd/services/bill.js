var connectionpool = require('./connectionpool');

function createBill(msg, callback){
    var res = {};
    var date1 = new Date(msg.b.from_date);
    var date2 = new Date(msg.b.to_date);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var duration = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var total=duration*msg.b.amount;

    console.log(date1);
    connectionpool.getConnection(function(err,connection) {
        if (err) {
            connectionpool.releaseSQLConnection(connection);
            res.code = 401;
            res.value = "Error connecting to Db";
            callback(null, res);
            return;
        }
        var post = { user_id: msg.user_id, host_id: msg.b.host_id, property_id: msg.b.property_id, from_date: date1, to_date: date2, duration:duration, category:msg.b.category, no_of_guest:msg.b.no_of_guest,security_deposite:msg.b.security_deposite, amount:total, date:new Date() ,user_flag:1,host_flag: 1 };
        var query = connection.query('INSERT INTO bill SET ?', post, function (err, result) {
            if (err) {
                res.code = 401;
                res.value = "Error in bill Generation";
                callback(null, res);
                console.log(err);
                connectionpool.releaseSQLConnection(connection);
                return;
            }
            res.code = 200;
            res.value = "Bill Generation Successful";
            callback(null, res);
            connectionpool.releaseSQLConnection(connection);
        });
    });

};
function getBillByUid(msg,callback) {
    var res={};
    console.log("Bill UID module");
    //console.log(JSON.stringify(msg));
    connectionpool.getConnection(function(err,connection) {
        if (err) {
            connectionpool.releaseSQLConnection(connection);
            res.code = 401;
            res.value = "Error connecting to Db";
            callback(null, res);
            return;
        }
        var user_id=msg.user_id;
       // var post = { user_id: msg.user_id, host_id: msg.b.host_id, property_id: msg.b.property_id, from_date: msg.b.from_date, to_date: msg.b.to_date, category:msg.b.category, location:msg.b.location, no_of_guest:msg.b.no_of_guest,security_deposite:msg.b.security_deposite, amount:msg.b.amount, date:Date() ,user_flag:1,host_flag: 1 };
        var query = connection.query('select bill.bill_id, bill.duration,bill.amount, properties.title from bill inner join properties where bill.user_id= ? and bill.property_id=properties.propertyid', [user_id], function (err, result) {
            if (err) {
                res.code = 401;
                res.value = "Bill not found error";
                callback(null, res);
                console.log(err);
                connectionpool.releaseSQLConnection(connection);
                return;
            }
            res.code = 200;
            res.value = "Bill Found";
            res.result=result;
            callback(null, res);
            connectionpool.releaseSQLConnection(connection);
        });
    });
}function getBillByHid(msg,callback) {
    var res={};
    console.log(JSON.stringify(msg));
    connectionpool.getConnection(function(err,connection) {
        if (err) {
            connectionpool.releaseSQLConnection(connection);
            res.code = 401;
            res.value = "Error connecting to Db";
            callback(null, res);
            return;
        }
        var host_id=msg.user_id;
        // var post = { user_id: msg.user_id, host_id: msg.b.host_id, property_id: msg.b.property_id, from_date: msg.b.from_date, to_date: msg.b.to_date, category:msg.b.category, location:msg.b.location, no_of_guest:msg.b.no_of_guest,security_deposite:msg.b.security_deposite, amount:msg.b.amount, date:Date() ,user_flag:1,host_flag: 1 };
        var query = connection.query('select bill.bill_id, bill.duration,bill.amount, properties.title from bill inner join properties where bill.host_id=? and bill.property_id=properties.propertyid', [host_id], function (err, result) {
            if (err) {
                res.code = 401;
                res.value = "Bill not found error";
                callback(null, res);
                console.log(err);
                connectionpool.releaseSQLConnection(connection);
                return;
            }
            res.code = 200;
            res.value = "Bill Found";
            res.result=result;
            callback(null, res);
            connectionpool.releaseSQLConnection(connection);
        });
    });
}
function getByBillId(msg,callback) {
    var res={};
    console.log("In Bill by id module");
   // console.log(JSON.stringify(msg));
    connectionpool.getConnection(function(err,connection) {
        if (err) {
            connectionpool.releaseSQLConnection(connection);
            res.code = 401;
            res.value = "Error connecting to Db";
            callback(null, res);
            return;
        }
        var bill_id=msg.bill_id;
        // var post = { user_id: msg.user_id, host_id: msg.b.host_id, property_id: msg.b.property_id, from_date: msg.b.from_date, to_date: msg.b.to_date, category:msg.b.category, location:msg.b.location, no_of_guest:msg.b.no_of_guest,security_deposite:msg.b.security_deposite, amount:msg.b.amount, date:Date() ,user_flag:1,host_flag: 1 };
        var query = connection.query('select * from bill inner join properties on bill.property_id=properties.propertyid inner join users on bill.user_id=users.id where bill.bill_id= ?', [bill_id], function (err, result) {
            if (err) {
                res.code = 401;
                res.value = "Bill not found error";
                callback(null, res);
                console.log(err);
                connectionpool.releaseSQLConnection(connection);
                return;
            }
            res.code = 200;
            res.value = "Bill By id Found";
            res.result=result;
            callback(null, res);
            connectionpool.releaseSQLConnection(connection);
        });
    });
}

function deleteBill(msg,callback) {
    var res={};
    //console.log(JSON.stringify(msg));
    console.log("inside Deletion Module")
    connectionpool.getConnection(function(err,connection) {
        if (err) {
            connectionpool.releaseSQLConnection(connection);
            res.code = 401;
            res.value = "Error connecting to Db";
            callback(null, res);
            return;
        }
        var user_id=msg.user_id;
        var bill_id=msg.bill_id;
        var query = connection.query('SELECT user_id, host_id FROM bill where bill_id = ?', [bill_id], function (err, result) {
            if (err) {
                res.code = 401;
                res.value = "Bill not found error";
                callback(null, res);
                console.log(err);
                connectionpool.releaseSQLConnection(connection);
                return;
            }
            else {
                console.log(result[0].user_id);
                if(result[0].user_id==user_id){
                    console.log("In user Deletion");
                    var query1 = connection.query('UPDATE `bill` SET  user_flag = 0 Where bill_id = ?', [bill_id], function (err, result) {
                        if (err) {
                            res.code = 401;
                            res.value = "error for user Bill";
                            callback(null, res);
                            console.log(err);
                            connectionpool.releaseSQLConnection(connection);
                            return;
                        }
                        else {
                            res.code = 200;
                            res.value = "Bill Bill Deleted For User";
                            res.result = result;
                            callback(null, res);
                            connectionpool.releaseSQLConnection(connection);
                        }
                    });
                }
                if(result[0].host_id==user_id)
                {
                    console.log("In Host Deletion");
                    var query2 = connection.query('UPDATE `bill` SET  host_flag = 0 Where bill_id = ?', [bill_id], function (err, result) {
                        if (err) {
                            res.code = 401;
                            res.value = "error for host";
                            callback(null, res);
                            console.log(err);
                            connectionpool.releaseSQLConnection(connection);
                            return;
                        }
                        else {
                            res.code = 200;
                            res.value = "Bill Deleted For Host";
                            res.result = result;
                            callback(null, res);
                            connectionpool.releaseSQLConnection(connection);
                        }
                    });
                }
                else{
                    res.code = 401;
                    res.value = "error for host";
                    callback(null, res);
                    console.log(err);
                    connectionpool.releaseSQLConnection(connection);
                    return;
                }
            }
        });
    });
}
exports.createBill = createBill;
exports.getBillByUid = getBillByUid;
exports.getBillByHid = getBillByHid;
exports.getByBillId = getByBillId;
exports.deleteBill=deleteBill;
