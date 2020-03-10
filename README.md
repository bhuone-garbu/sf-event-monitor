# Salesforce platform event monitoring script (node.js)

## Intro

This is just a simple dumb script I created to monitor the platform events published by Salesforce using node. When a message is received, I simply print the message on the screen. That's it.

This is just for monitoring purpose using the **Faye** node module: https://faye.jcoglan.com/

## Getting started

Checkout (clone) this repo. Assuming `npm` and `node` are installed, run the following:
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

Ensure that your user can authenticate and has permissin to read the specific Platform Event that you want to monitor.

## Running the cli

Pass the name of the platform event that exists on Salesforce that you want to monitor as named argument:
`--event=Hello__e`

Additionally, for monitoring on **live** environment, provide the `NODE_ENV` variable as `login`
```.sh
NODE_ENV=login node sf_subscriber.js --event='Hello__e'
```

Or it will default to test/dev sandbox
```
node sf_subscriber.js --event='Hello__e'
```

This can always be hardcorded on the `.env` file if needed.

All this is doing is switching prefix of the global oauth2 endpoint on Salesforce
* `https://test.salesforce.com/services/oauth2/token` for sandbox/uat environment
* `https://login.salesforce.com/services/oauth2/token` for production salesforce


Assuming everything works fine, then you should see that you have subscribed and start receiving message
```
$ node sf_subscriber.js --event='Hello__e'

Salesforce instance url: https://some_instance.salesforce.com
Subscribed to: Hello__e
Message:

{"schema":"-2QuiBn9MjLlv6RCsJrA5Q", "body" : "hello" }

```
