var winston = require('winston');
winston.configure({
    transports: [
        new (winston.transports.File)({ filename: 'server.log' })
    ]
});

exports.insertlog = function(message){
    winston.log('info', message, { anything: 'This is metadata' });
};

exports.mostuserpropertyvisited=function(propertyid,callback)
{
    var options = {
        from: new Date - 24 * 60 * 60 * 1000,
        until: new Date,
        limit: 10,
        start: 0,
        order: 'desc',
        fields: ['message.propertyid']
    };

    //
    // Find items logged between today and yesterday.
    //
    winston.query(options, function (err, results) {
        if (err) {
            throw err;
        }
        //callback(json.stringify());
        console.log("Inside Query" + JSON.stringify(results));
    });
}
