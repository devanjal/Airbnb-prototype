var connectionpool = require('./connectionpool');

function createBill(msg, callback){
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
        var post = { user_id: msg.user_id, host_id: msg.b.host_id, property_id: msg.b.property_id, from_date: msg.b.from_date, to_date: msg.b.to_date, category:msg.b.category, location:msg.b.location, no_of_guest:msg.b.no_of_guest,security_deposite:msg.b.security_deposite, amount:msg.b.amount, date:Date() ,user_flag:1,host_flag: 1 };
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

exports.createBill = createBill;