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

function gettoprevenue(msg, callback){
    var res = {};
    var query = "";
    if(msg.type == 'property')
    {
        query = 'select  property_id,location,properties.city,properties.title,sum(amount) as netrevenue from bill inner join properties on bill.property_id = properties.propertyid  group by property_id order by netrevenue DESC limit 10';
    }
    else if(msg.type == 'city')
    {
        query = 'select  city,location,sum(amount) as netrevenue from bill inner join properties on bill.property_id = properties.propertyid  group by properties.city order by netrevenue DESC limit 10';
    }
    else if(msg.type == 'host')
    {
        query = 'select  firstname,lastname,sum(amount) as netrevenue from bill inner join users on bill.host_id = users.id  group by host_id order by netrevenue DESC limit 10';
    }
    connectionpool.getConnection(function(err,connection){
        if(err){
            connectionpool.releaseSQLConnection(connection);
            res.code = 401;
            res.value = "Error connecting to Db";
            callback(null, res);
            return;
        }
        connection.query(
            query,
            [],
            function (err, rows,fields) {
                if (err)
                {
                    res.code = 401;
                    callback(null, res);
                    connectionpool.releaseSQLConnection(connection);
                    return;
                }
                res.code = 200;
                res.value = rows;
                callback(null, res);
                connectionpool.releaseSQLConnection(connection);
            });
    });
};

exports.approvehost = approvehost;
exports.gettoprevenue = gettoprevenue;
//exports.gethostrequests = gethostrequests;
