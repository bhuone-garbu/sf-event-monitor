## Salesforce platform event monitoring script (node.js)

### Intro

This is just a simple dumb script I created to monitor the platform events published by Salesforce using node. When a message is received, I simply print the message on the screen. That's it.

This is just for monitoring purpose using the **Faye** node module: https://faye.jcoglan.com/

### Getting started

Checkout (clone) this repo, install `node` with `npm` and run the following:
```
npm install
```

Create an `.env` file at the root of the root of the project with the following details:

```.env
CLIENT_ID="client_id"
CLIENT_SECRET="client_secret"
USERNAME="your sf username based on the sandbox or live environment"
PASSWORD="your sf password"
```

Ensure that your user can authenticate and can view the specific Platform Event that need to listen.

### Running the cli

Pass the name of the platform event that exists on Salesforce that we want to monitor on the command line: `--event=Hello__e`.

For live add provide the `NODE_ENV` variable as `login`
```
NODE_ENV=login node sf_subscriber.js --event='Hello__e'
```

For sandbox or dev environment, just
```
node sf_subscriber.js --event='Hello__e'
```

All this is doing is switching prefix of the global oauth2 endpoint on Salesforce
* `https://test.salesforce.com/services/oauth2/token` for sandbox and uat
* `https://login.salesforce.com/services/oauth2/token` for production salesforce


Assuming everything works fine, then you should see that you have subscribed and start receiving message
```
$ node sf_subscriber.js --event='Hello__e'
instance_url: https://some_instance.salesforce.com
sf_event_name: Hello__e
Subscribed...
Message:

{"schema":"-2QuiBn9MjLlv6RCsJrA5Q", "body" : "hello" }

```
