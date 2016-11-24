//var ejs=require('ejs');
//var session = require('express-session');
var mysql= require('./mysql');
exports.profile = function(req, res){
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

        res.render('profile');


};
exports.getProfile=function(msg,callback){
   // console.log("ques m aa rha h"+msg.first_name)
    var res = {};

    var insert_items='SELECT * FROM user where user_id='+msg.user_id+'';
    mysql.fetchData(insert_items,function(err,result){
        if(err){
            console.log(err);
            res.code = "401";
            res.err=err;
            callback(null,res);
        }
        else{
            res.code = "200";
            //res.result=result;
            res.first_name= result[0].first_name;
            res.last_name= result[0].last_name;
            res.user_id=result[0].user_id;
            res.email=result[0].email;
            res.gender=result[0].gender;
            res.phone=result[0].phone;
            res.currency=result[0].currency;
            res.location=result[0].location;
            res.language=result[0].language;
            res.birthday=result[0].birthday;
            res.about=result[0].about;
            console.log()
            callback(null,res);

        }});
};
exports.setProfile=function(msg,callback){
    console.log("ques m aa rha h"+msg.first_name)
    var res = {};
    var first_name=msg.first_name;
    var phone =msg.phone;
    var language =msg.language;
    var gender =msg.gender;
    var location =msg.location;
    var last_name=msg.last_name;
    var email=msg.email;
    var about=msg.about;
    var currency =msg.currency;
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
            callback(null,res);
        }
        else{
            res.code = "200";
            res.result=result;
            console.log(res.code)
            callback(null,res);
        }

    });

};
exports.viewProfile=function(req,res){
    res.render('viewprofile');
};
exports.checkProfile=function(msg,callback){
    // console.log("ques m aa rha h"+msg.first_name)
    var res = {};

    var insert_items='SELECT * FROM user';
    mysql.fetchData(insert_items,function(err,result){
        if(err){
            console.log(err);
            res.code="401"
            res.err=err;
            callback(null,res);
        }
        else{
            res.code="200";
            res.first_name= result[0].first_name;
            res.join_date= result[0].join_date;
            res.location=result[0].location;

         //   var json_response={first_name: first_name,location:location, join_date:join_date};
            callback(null,res);
            // // res.send(result);
            // res.send(json_response);
            // // console.log(x);
        }});
};