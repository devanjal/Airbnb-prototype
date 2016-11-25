var express = require('express');
var router = express.Router();
//var ejs=require('ejs');
//var session = require('express-session');
//var mysql= require('./mysql');
var mq_client = require('../rpc/client');
router.get('/profile' ,function(req, res){
   // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
      res.render('profile');
});
router.get('/getProfile',function(req,res){
    var insert_items='SELECT * FROM user';
    var msg_payload = {"type":"viewprofile","user_id":req.session.user_id};

    mq_client.make_request('profile_queue',msg_payload,function(err,results){


        if(err){
            throw err;
        }else{
            if(results.code == 200){
                var first_name= results.first_name;
                var last_name= results.last_name;
                var user_id=results.user_id;
                var email=results.email;
                var gender=results.gender;
                var phone=results.phone;
                var currency=results.currency;
                var location=results.location;
                var language=results.language;
                var birthday=results.birthday;
                var values = birthday.split('/');
                var month=values[0];
                var day=values[1];
                var year=values[2];
                var about=results.about;
                console.log(about);
                req.session.first_name=first_name;
                req.session.user_id=user_id;

                var json_response={first_name:first_name,last_name:last_name,email:email,month:month,day:day,
                    year:year,gender:gender, location:location,phone:phone,currency:currency,language:language,about:about};
                res.send(json_response);

            }
            else{
                console.log("View Profile Error");
               // res.send({"statuscode":401});
            }
        }
    });
});
router.post('/updateProfile',function(req,res){

    var first_name=req.body.first_name;
    var phone =req.body.phone;
    var language =req.body.language;
    var gender =req.body.gender;
    var location =req.body.location;
    var last_name=req.body.last_name;
    var email=req.body.email;
    var month=req.body.month;
    var year=req.body.year;
    var day=req.body.day;
    var currency =req.body.currency;
    var about=req.body.about;
    //console.log(req.body);
   // console.log(setProfile);
    var msg_payload = {"type":"profile","first_name":first_name,"last_name":last_name,"phone":phone,"language":language,
        "gender":gender,"location":location,"currency":currency,"month":month,"year":year,"day":day, "about":about, "user_id":req.session.user_id, "email":email};

    mq_client.make_request('profile_queue',msg_payload,function(err,results){
        console.log("errrrrrrr"+results.code);

        if(err){
            throw err;
        }else{
            if(results.code == 200){
                console.log("User account created.");
                var json_response={"statuscode":200};
                         res.send(json_response);
            }
            else{
                console.log("User account not created");
                res.send({"statuscode":401});
            }
        }
    });


});
router.get('/viewProfile',function(req,res){
    res.render('viewprofile');
});
router.get('/fetchProfile',function(req,res){
    var msg_payload = {"type":"checkprofile"}//req.session.user_id};

    mq_client.make_request('profile_queue',msg_payload,function(err,results){
        //console.log("errrrrrrr"+results.first_name);

        if(err){
            throw err;
        }else{
            if(results.code == 200){

                var first_name= results.first_name;
                var location= results.location;
                var join_date=results.join_date;
                var values = join_date.split(' ');
                var x=values[0];
                var json_response={first_name:first_name,join_date:x, location:location};
                res.send(json_response);
            }
            else{
                console.log("View Profile Error");
                // res.send({"statuscode":401});
            }
        }
    });
});
module.exports=router;