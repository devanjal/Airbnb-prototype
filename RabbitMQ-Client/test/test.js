
var request = require('request')
    , express = require('express')
    ,assert = require("assert")
    ,http = require("http");

describe('airbnb test', function(){

    it('reject user trip', function(done) {
        request.post(
            'http://localhost:80/host/approvetrips',
            { form: { tripid:12 } },
            function (error, response, body) {
                console.log(JSON.stringify(body));
                var ret = JSON.parse(body);
                assert.equal('success', ret.status);
                done();
            }
        );
    });


});