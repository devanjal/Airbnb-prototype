
//var mongo = require('mongodb');
//var mongoURL = "mongodb://localhost:27017/ebay";
var bcrypt = require('bcryptjs');
var mysql = require('mysql');

exports.handle_request = function (msg, callback) {
	console.log("inside login queue server");
	console.log(JSON.stringify(msg));
    var username = JSON.stringify(msg.username);
    var pass = msg.password;
    // console.log(pass);
    var res = {};
    
    var connection = mysql.createConnection({
    	host: 'localhost',
    	user: 'root',
    	password: 'root',
    	database: 'register_user'
    });
    
    var query = connection.query("SELECT * FROM user_information WHERE email = " + username, function(err, rows){
//		console.log(query);  
    	if (err){           
			  console.log("Error in login " + err);
              callback(null, res);
		  }else if (rows){
//			  var hash2 =  passwordHash.generate(p);
//			  var hash1 = rows[0].password;
//			  console.log(hash1);
//			  console.log(hash2);
//			  console.log(passwordHash.verify(p, hash2));
//			  if (!hash2.localeCompare(hash1)) {
//					 console.log("Password invalid");
//					 res.send("not exit");
//			  }
//			  else{
//				  console.log("user exists");	
//					 res.send("successful");
//			  }
			  
			  console.log("checking for password");
				if(rows[0].password == pass){
                    // console.log("login");
                	console.log("Passwords match");
                    res.code = 200;
                    res.value = "Login Success";
//                    res.username = rows.firstname;
//                    res.userid = rows._id;
//                    res.email = rows.email;
//                    res.signintime = rows.signintime;
                    callback(null, res);
				}else{
						console.log("wrong password");
                        res.code = 401;
                        res.value = "Wrong password";
                        callback(null, res);
                    }
		  }
		  else{
			  console.log("no user found");
            callback(null, res);
		  }
	  });
	};

//    mongo.connect(mongoURL, function (err, db) {
//        var coll = db.collection('user_info');
    
//        coll.findOne({email : email}, function (err, rows) {
//            if (err) {
//            	console.error("Error in login "+err);
//            }
//            else if(rows){
                // console.log(rows);
//                var hash = rows.password;
//                bcrypt.compare(pass, hash, function (err, valid) {
//                     if(valid == true){
//                     	if(rows.password == pass){
                         // console.log("login");
//                     		console.log("Passwords match");
//                         res.code = 200;
//                         res.value = "Login Success";
//                         res.username = rows.firstname;
//                         res.userid = rows._id;
//                         res.email = rows.email;
//                         res.signintime = rows.signintime;
//                         callback(null, res);

//                     }else {
                         // console.log("wrng pass");
//                         res.code = 401;
//                         res.value = "Wrong password";
//                         callback(null, res);

//                     }
                    // console.log("callback");
//                    db.close();
//                    callback(null, res);
//                });
//            }else {
//                callback(null, res);
                // console.log("no user");
                // res.code = 404;
                // res.value = "No user found";
//            }

//        });
//    });
//};