var express = require('express');
var router = express.Router();
var passport = require('passport');
var mq_client = require('../rpc/client');

router.post("/", function (req, res) {
	console.log("req: " + JSON.stringify(req.body));
});

router.post('/register', function (req, res, next) {
	console.log(JSON.stringify(req.body));
	var dob = req.body.birthday_month + "/" + req.body.birthday_day + "/" + req.body.birthday_year;

	var msg_payload = { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password, birthdate: dob };

	mq_client.make_request('register_queue', msg_payload, function (err, results) {
		console.log(results);
		if (err) {
			console.log(err);
			return;
		}
		if (results.code == 200) {
			res.send({ 'status': "success" });
			res.end();
		}
		else if (results.code == 401) {
			res.send({ 'error': results.value });
			res.end();
		}
	});
});

router.post('/login', function (req, res, next) {
	console.log("inside /users/login req: " + JSON.stringify(req.body));
	passport.authenticate('login', function (err, user, info) {
		console.log(info);
		console.log(user);
		if (err) {
			console.log(err);
			res.send(err);
		}
		if (!user) {
			console.log("Invalid credentials");
			res.send({ error: info.value });
		} else {
			delete user.password;
			console.log("user info");
			console.log(user);
			req.session.user = user;
			res.send({ status: "success",user:user });
		}
	})(req, res, next);
});
module.exports = router;
