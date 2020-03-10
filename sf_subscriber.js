'use strict';

const faye = require('faye');
const request = require('request');
const args = require('yargs').argv;
require('dotenv').config()

// kinda dumb function to listen and log platform events on Salesforce
const subscribeAndLogEventMessages = (error, response, body) => {

  if (!error && response.statusCode == 200) {
    const { access_token, instance_url } = JSON.parse(body);
    const sf_event_name = args.event;

    console.log(`Salesforce instance url: ${instance_url}`);

    const client = new faye.Client(`${instance_url}'/cometd/40.0/'`);

    // adding the OAuth token header
    client.setHeader('Authorization', `OAuth ${access_token}`);
    client.subscribe(`/event/${sf_event_name}`, (message) => {
      console.log(`Message: \n ${JSON.stringify(message)}`);
    });

    // this will just confirm that the the subscribtion is active
    client.callback(() => console.log(`Subscribed to: ${sf_event_name}`));

    // log that upstream subscription encounters error
    client.errback((error) => console.error(`ERROR ON subscription attempt: ${error.message}`));
  }

  else {
    console.error('Failed to get an oauth token... Error:\n');
    console.error(JSON.stringify(response));
  }
};

// either 'login' or 'test'
const env = process.env.NODE_ENV || 'test';

// oauth2 url
const url = `https://${env}.salesforce.com/services/oauth2/token`

request.post({
  url,
  form: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    grant_type: 'password'
  }
}, subscribeAndLogEventMessages);
