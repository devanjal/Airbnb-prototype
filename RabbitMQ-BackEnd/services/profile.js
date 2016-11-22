//var ejs=require('ejs');
//var session = require('express-session');
var mysql= require('./mysql');
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
            var month=result[0].month;
            var day=result[0].day;
            var year=result[0].year;
            console.log(user_id);
           //var sess= req.session;
           // var x =sess.first_name;
            //x=first_name;
          req.session.first_name=first_name;
            req.session.user_id=user_id;

            var json_response={first_name:first_name,last_name:last_name,email:email,month:month,day:day,year:year};
            // res.send(result);
            res.send(json_response);
           // console.log(x);
        }});
};
exports.setProfile=function(msg,callback){
    console.log("ques m aa rha h"+msg.first_name)
    var res = {};
    //var sess= req.session;
    var first_name=msg.first_name;
   // var age =req.body.age;
    var phone =msg.phone;
    var language =msg.language;
    var gender =msg.gender;
    var location =msg.location;
    var last_name=msg.last_name;
    var email=msg.email;
    var about=msg.about;
   // console.log("ques m aa rha h"+msg.first_name)
    // var month=req.body.month;
    // var year=req.body.year;
    // var day=req.body.day;
    var currency =msg.currency;
    //console.log(req.body);
   var setProfile='update user set first_name="'+first_name+'",last_name="'+last_name+'",' +
       'email="'+email+'", language="'+language+'",currency="'+currency+'",location="'+location+'",' +
       'gender="'+gender+'", phone="'+phone+'", birthday="'+msg.month+'/'+msg.day+'/'+msg.year+'",about="'+about+'" where user_id="'+msg.user_id+'"';
    console.log(setProfile);
    mysql.fetchData(setProfile,function(err,result){
        if(err){

            res.err=err;
            res.code="401";

            console.log(err);
            // callback(null,res);
            // var json_response={"error" : err, "statuscode":401};
            // res.send(json_response);
        }
        else{
            res.code = "200";
            res.result=result;
            console.log(res.code)
            // res._id=user._id;
            // res.first_name=user.first_name;
            // res.last_name=user.last_name;
            // res.user_id=user.user_id;
            // res.devanjal=user.last_login;
            // console.log(res._id);

            // var json_response={"result" : result, "statuscode":200};
            // //var json_response=result;
            // res.send(json_response);


        }
        callback(null,res);
    });

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