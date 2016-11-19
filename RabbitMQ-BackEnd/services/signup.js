var connectionpool = require('./connectionpool');
var bcrypt = require('bcryptjs');

function handle_signup(msg, callback) {
	var res = {};
	console.log('handle signup');
	connectionpool.getConnection(function (err, connection) {
		if (err) {
			res.code = 401;
			res.value = "DB Connection Failure";
			callback(null, res);
			return;
		}
		const saltRounds = 10;
		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(msg.password, salt, function (err, hash) {
				var post = { firstname: msg.firstname, lastname: msg.lastname, email: msg.email, password: hash, birthdate: msg.birthdate };
				var query = connection.query('INSERT INTO users SET ?', post, function (err, result) {
					// Neat!
					if (err) {
						res.code = 401;
						res.value = "User name already exists.";
						callback(null, res);
						console.log(err);
						connectionpool.releaseSQLConnection(connection);
						return;
					}
					res.code = 200;
					res.value = "Successfully Registered";
					callback(null, res);
					connectionpool.releaseSQLConnection(connection);
				});
			});
		});
	});
};

exports.handle_signup = handle_signup;