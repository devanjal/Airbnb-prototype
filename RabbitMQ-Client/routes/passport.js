/**
 * http://usejsdoc.org/
 */

//var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var log = require('./logger');
var mq_client = require('../rpc/client');


	module.exports = function(passport) {
	    passport.use('login', new LocalStrategy(function(username, password, done) {  
	    	console.log("inside passport.js username: " + username);
	    	console.log("passport: " + passport);
	    	var username = username;
	    	var password = password;
	    	var msg_payload = { username: username,password:password };  		
	    	mq_client.make_request('login_queue',msg_payload, function(err,results){
	    		if(err){
	    			return done(err);
	    		}
	    		else{  			
	    			if(results.code == 200){
	    				console.log('response from server'); 				
	    				done(null, results);
	    			}else {    
	    				console.log("Invalid Login");
	    				return done(null, false);
	    			}
	    		}  
	    	});
	    }));
};	    
