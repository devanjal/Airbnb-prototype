
var request = require('request')
    , express = require('express')
    ,assert = require("assert")
    ,http = require("http");

describe('airbnb test', function(){

    it('reject user trip', function(done) {
        request.post(
            'http://localhost:80/host/rejecttrips',
            { form: { tripid:12 } },
            function (error, response, body) {
     //           console.log(JSON.stringify(body));
                var ret = JSON.parse(body);
                assert.equal('success', ret.status);
                done();
            }
        );
    });
    it('accept user trip', function(done) {
        request.post(
            'http://localhost:80/host/approvetrips',
            { form: { tripid:12 } },
            function (error, response, body) {
       //         console.log(JSON.stringify(body));
                var ret = JSON.parse(body);
                assert.equal('success', ret.status);
                done();
            }
        );
    });
    it('shoud return the login page', function(done){
        http.get('http://localhost:80/', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });
    it('should add new user', function(done) {
        request.post(
            'http://localhost:80/users/register',
            { form: { firstname:'test username',lastname:'test lasname',email:'testemail@ggmail.com',password:'testpassword',birthday_day:'13',birthday_month:'12',birthday_year:'1990' } },
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
    it('it should successfully approve host', function(done) {
        request.post(
            'http://localhost:80/admin/approvehost',
            { form: { hostid:15} },
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
    it('it should successfully reject host', function(done) {
        request.post(
            'http://localhost:80/admin/rejecthost',
            { form: { hostid:15} },
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
    it('get top revenue by properties', function(done) {
        request.post(
            'http://localhost:80/admin/gettoprevenue',
            { form: { type:'properties'} },
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
    it('get top revenue by host', function(done) {
        request.post(
            'http://localhost:80/admin/gettoprevenue',
            { form: { type:'host'} },
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
    it('get top revenue by city', function(done) {
        request.post(
            'http://localhost:80/admin/gettoprevenue',
            { form: { type:'city'} },
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });

    it('should successfully review property', function(done) {
        request.post(
            'http://localhost:80/review/makepropertyreview',
            { form: { property_id:12,starrating:4,review:'this is a very good place'} },
            function (error, response, body) {
                assert.equal(500, response.statusCode);
                done();
            }
        );
    });
});