var faye = require('faye'),
    request = require('request'),
	unescapeJs = require('unescape-js');

//var token, instance_url;

var url_post = {
    url: 'https://test.salesforce.com/services/oauth2/token',
    form: {
        client_id: 'client_id',
        client_secret: 'client_secret',
        username: 'username',
        password: 'password',
        grant_type: 'password'
    }
};

// this is going to be our callback function after we authenticate to the a particular server
function getOAuthAndListenForEvents(error, response, body) {
    if (!error && response.statusCode == 200) {
        let info = JSON.parse(body);

        let access_token = info.access_token;
        let instance_url = info.instance_url;

        //console.log('token: ' + access_token);
        console.log('instance_url: ' + instance_url);
        //console.log('token type: ' + info.token_type);

        let client = new faye.Client(instance_url + '/cometd/40.0/');

        // adding the OAuth token header
        client.setHeader('Authorization', 'OAuth ' + access_token);
        client.subscribe('/event/Verification_Check_Change__e', function(message) {
            console.log('Got a message: \n' + JSON.stringify(message));
            console.log('schema: \n' + JSON.stringify(message.schema));
            console.log('payload: \n' + JSON.stringify(message.payload));
        });

		// this will just confirm that the the subscribtion is active
        client.callback(function() {
            console.log('Subscribed...' );
        });

        // log that upstream subscription encounters error
        client.errback(function(error) {
            console.error("ERROR ON subscription Attempt: " + error.message );
        });
    } else {
        console.log('Failed to get an OAuth token... :(');
        console.log('Response:\n' + response);
    }
};

// make the request
request.post(url_post, getOAuthAndListenForEvents);
