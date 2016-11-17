var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');
router.post('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  console.log(JSON.stringify(req.body));
  //birthday_day 2
  //birthday_month 2
  //birthday_year 2016
  var dob = req.body.birthday_month + "/" + req.body.birthday_day + "/" + req.body.birthday_year;
  //var date = new Date(dob);
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

    // else {
    //   if (results.code == 200) {
    //     console.log('response from server');
    //     //to do redirect to some page
    //     res.send("Resistration success");
    //   }
    //   else {
    //     console.log("Invalid signup... record duplication");
    //     res.send("Resistration failure");
    //     return done(null, false);
    //   }
    // }
  });
});
module.exports = router;
