var ejs=require('ejs');
var session = require('express-session');
var mysql= require('./mysql');
var mq_client = require('../rpc/client');
exports.profile = function(req, res){
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

        res.render('profile');


};
exports.getProfile=function(req,res){
    var insert_items='SELECT * FROM user';
    mysql.fetchData(insert_items,function(err,result){
        if(err){
            console.log(err);
        }
        else{
            var first_name= result[0].first_name;
            var last_name= result[0].last_name;
            var user_id=result[0].user_id;
            var email=result[0].email;
            var gender=result[0].gender;
            var phone=result[0].phone;
            var currency=result[0].currency;
            var location=result[0].location;
            var language=result[0].language;
            var birthday=result[0].birthday;
            var values = birthday.split('/');

            var month=values[0];
            var day=values[1];
            var year=values[2];
            var about=result[0].about;
            console.log(about);
           //var sess= req.session;
           // var x =sess.first_name;
            //x=first_name;
          req.session.first_name=first_name;
            req.session.user_id=user_id;

            var json_response={first_name:first_name,last_name:last_name,email:email,month:month,day:day,
                year:year,gender:gender, location:location,phone:phone,currency:currency,language:language,about:about};
            // res.send(result);
            console.log("JAAAAAASSSSSOOOOONNNNN"+json_response);
            res.send(json_response);
           //
        }});
};
exports.setProfile=function(req,res){
    //var sess= req.session;
    var first_name=req.body.first_name;
   // var age =req.body.age;
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
   var setProfile='update user set first_name="'+first_name+'",last_name="'+last_name+'",' +
       'email="'+email+'", language="'+language+'",currency="'+currency+'",location="'+location+'",' +
       'gender="'+gender+'", phone="'+phone+'" where user_id="'+req.session.user_id+'"';
    console.log(setProfile);
    var msg_payload = {"type":"profile","first_name":first_name,"last_name":last_name,"phone":phone,"language":language,
        "gender":gender,"location":location,"currency":currency,"month":month,"year":year,"day":day, "about":about, "user_id":req.session.user_id, "email":email};

    //console.log("POST Request for signup :"+name +" "+newUserEmail+" "+newUserPassword);

    mq_client.make_request('profile_queue',msg_payload,function(err,results){
        console.log("errrrrrrr"+results.code);

        if(err){
            throw err;
        }else{
            if(results.code == 200){
                console.log("User account created.");
                // req.session.email = results.email;
                // req.session.first_name = results.first_name;
                // req.session.last_name = results.last_name;
                // req.session.user_id = results._id;
                // req.session.devanjal = results.devanjal;
                var json_response={"statuscode":200};
                //         //var json_response=result;
                         res.send(json_response);
             //   res.send(results);
            }
            else{
                console.log("User account not created");
                res.send({"statuscode":401});
            }
        }
    });
    // mysql.fetchData(setProfile,function(err,result){
    //     if(err){
    //         console.log(err);
    //         var json_response={"error" : err, "statuscode":401};
    //         res.send(json_response);
    //     }
    //     else{
    //
    //         var json_response={"result" : result, "statuscode":200};
    //         //var json_response=result;
    //         res.send(json_response);
    //
    //
    //     }});

};
exports.viewProfile=function(req,res){
    res.render('viewprofile');
};
exports.checkProfile=function(req,res){
    var insert_items='SELECT * FROM user';
    mysql.fetchData(insert_items,function(err,result){
        if(err){
            console.log(err);
        }
        else{
            var first_name= result[0].first_name;
            var last_name= result[0].last_name;
            var user_id=result[0].user_id;
            var email=result[0].email;
            var month=result[0].month;
            var day=result[0].day;
            var year=result[0].year;
            var location=result[0].location;
            console.log(user_id);
            //var sess= req.session;
            // var x =sess.first_name;
            //x=first_name;
            req.session.first_name=first_name;
            req.session.user_id=user_id;

            var json_response={first_name:first_name,last_name:last_name,email:email,month:month,day:day,year:year,location:location}
            // res.send(result);
            res.send(json_response);
            // console.log(x);
        }});
};