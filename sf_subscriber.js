'use strict';

const faye = require( 'faye' ),
    request = require( 'request' ),
    unescapeJs = require( 'unescape-js' ),
	args = require( 'yargs' ).argv,
	config = require('./config');

// this is going to be our callback function after we authenticate to the a particular server
function getOAuthAndListenForEvents(error, response, body) {

    if ( !error && response.statusCode == 200 ) {
        let info = JSON.parse( body );

        let access_token = info.access_token;
        let instance_url = info.instance_url;
		let sf_event_name = args.event;

        console.log( 'instance_url: ' + instance_url );
        console.log( 'sf_event_name: ' + sf_event_name );

        let client = new faye.Client( instance_url + '/cometd/40.0/' );

        // adding the OAuth token header
        client.setHeader( 'Authorization', 'OAuth ' + access_token );
		client.subscribe( '/event/' + sf_event_name, function(message) {
            console.log( 'Got a message: \n' + JSON.stringify( message ) );
        });

		// this will just confirm that the the subscribtion is active
        client.callback( function() {
            console.log( 'Subscribed...' );
        });

        // log that upstream subscription encounters error
        client.errback( function( error ) {
            console.error( "ERROR ON subscription Attempt: " + error.message );
        });
    } else {
        console.log( 'Failed to get an OAuth token... :(' );
        console.log( 'Response:\n' + response );
    }
};


var url_post = {
    url: config.oauth_url,
    form: {
        client_id: config.oauth_settings.client_id,
        client_secret: config.oauth_settings.client_secret,
        username: config.oauth_settings.user_name,
        password: config.oauth_settings.password,
        grant_type: config.oauth_settings.grant_type
    }
};
request.post(url_post, getOAuthAndListenForEvents);
