
var mq_client = require('../rpc/client');
exports.signup = function(req,res)
{
    console.log("Inside sign up");
    var obj = {};
    var msg_payload  = {firstname: req.body.firstname, lastname:req.body.lastname,email:req.body.email,password:req.body.password,logintime:new Date().toDateString()};
    mq_client.make_request('register_queue',msg_payload, function(err,results){
        if(err){
            return done(err);
        }
        else
        {
            if(results.code == 200){
                console.log('response from server');
                //to do redirect to some page
                res.send("Resistration success");
            }
            else {
                console.log("Invalid signup... record duplication");
                res.send("Resistration failure");
                return done(null, false);
            }
        }
    });
};