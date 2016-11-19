var express = require('express');
var router = express.Router();
var passport = require('passport');
//require('./passport')(passport);

router.post("/",function(req,res){
	console.log("req: " + JSON.stringify(req.body));
});

router.post('/login', function(req, res,next) {
	console.log("inside /users/login req: " + JSON.stringify(req.body));
	 passport.authenticate('login', function(err, user, info) {
	        if(err) {
	        	console.log(err);
	            res.send(err);
	        }
	        if(!user) {
	        	console.log("Invalid credentials");
	            res.send({err:'Invalid username or password'});
	        }else{
	        	res.send({status:"success"});
	        }
	 })(req,res,next);
});
module.exports = router;
