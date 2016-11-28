var connectionpool = require('./connectionpool');

function approvehost(msg, callback){
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
            'UPDATE users SET usertype = ?,hoststatus = ? Where id = ?',
            ['host','approved',msg.id],
            function (err, result) {
                if (err)
                {
                    res.code = 401;
                    callback(null, res);
                    connectionpool.releaseSQLConnection(connection);
                    return;
                }
                res.code = 200;
                callback(null, res);
                connectionpool.releaseSQLConnection(connection);
            });
    });
};

exports.approvehost = approvehost;
