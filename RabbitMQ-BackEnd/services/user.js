var connectionpool = require('./connectionpool');
// add image path
function get_profile_request(msg, callback) {
    var res = {};
    console.log('get user info');
    connectionpool.getConnection(function(err, connection) {
        var query = connection.query('SELECT * FROM `users` WHERE `id` = ?', [msg.id], function(err, rows) {
            console.log(rows);
            if (err) {
                console.log("Error in login ");
                console.log(err);
                res.code = 401;
                res.value = err;
                callback(null, res);
                connectionpool.releaseSQLConnection(connection);
            } else if (rows.length > 0) {
                rows[0].profile_image = "";
                //fetch from mongodb
                var connection = connectionpool.getdbconnection();
                connection.collection('users').find({id:msg.id}).toArray(function (err, mongoresult) {
                    if (!err)
                    {
                        if(mongoresult.length != 0)
                        {
                            rows[0].profile_image = mongoresult[0].profile_image;
                        }
                    }
                    res.code = 200;
                    res.user = rows[0];
                    delete res.user.password;
                    connectionpool.releaseSQLConnection(connection);
                    callback(null, res);
                });
            }
            else {
                console.log("no user found");
                res.code = 401;
                res.value = 'Username does not exist.'
                callback(null, res);
                connectionpool.releaseSQLConnection(connection);
            }

        });
    });
};

function update_profile_request(msg, callback) {
    var res = {};
    console.log('update user profile');
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            connectionpool.releaseSQLConnection(connection);
            console.log('Error connecting to Db');
            return;
        }
        connection.query('UPDATE `users` SET  firstname = ?, lastname = ?,email = ?,birthdate = ?, phonenumber = ?, currency = ?, language = ? , location = ? , description = ?, gender = ?  Where id = ?',
            [msg.firstname, msg.lastname, msg.email, msg.birthdate, msg.phonenumber, msg.currency, msg.language, msg.location, msg.description, msg.gender, msg.id],
            function(err, result) {
                if (err) {
                    console.log(err);
                    connectionpool.releaseSQLConnection(connection);
                    res.code = 401;
                    res.value = err.code;
 			    }
                //update mongodb
                console.log(result);
                if (result) {
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

function user_profile_image_queue(msg, callback) {
    var res = {};
    console.log('update user profile');
    console.log(JSON.stringify(msg));
    var mongoconnection = connectionpool.getdbconnection();
    mongoconnection.collection('users').update({id:msg.hostid},{$set:{profile_image:msg.profile_image}}, {upsert:true},function(err, result) {
        //connection.collection('properties').insertOne(post, function(err, result) {
        if(err) {
            console.log(err);
            res.code = 400;
            res.value = err;
            connectionpool.releaseSQLConnection(connection);
            callback(null, res);
            return;
        }
        res.code = 200;
        res.value = "profile image updated";
        //connectionpool.releaseSQLConnection(connection);
        callback(null, res);
    });
}

exports.get_profile_request = get_profile_request;

exports.update_profile_request = update_profile_request;

exports.user_profile_image_queue = user_profile_image_queue;
//upload image path user_profile_image_queue