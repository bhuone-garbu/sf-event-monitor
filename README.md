## Salesforce platform event monitoring script (node.js)

### Intro

This is just a simple script to monitor the platform events published by Salesforce on the commmand line using node.js. When a message is received, we simple print the message on the screen. That's it. Nothing clever!

This is just for monitoring purpose using the **Faye** node module: https://faye.jcoglan.com/

### Getting started

Checkout (clone) this repo, install `node` with `npm` and run the following:
```
npm install
```

Use the `config_template.js` to create `config.js` and populate the server credentials on your local directory to get the oauth token.

### Running the cli

Ignore the other files other than `sf_subscriber.js`

Pass the name of the event that we want to monitor on the command line: `--event=Hello__e` depending on what has been setup on the org.

```
node sf_subscriber.js --event='Hello__e'
```

Example:
```
$ node sf_subscriber.js --event='Hello__e'
instance_url: https://some_name.cs107.my.salesforce.com
sf_event_name: Hello__e
Subscribed...
Got a message:

{"schema":"-2QuiBn9MjLlv6RCsJrA5Q", "body" : "hello" }

```
