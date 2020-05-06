# Salesforce platform event monitoring script (node.js)

## UPDATE!

I built this in the early 2018 when Salesforce started pushing for streaming and platform events for integrating with external 3rd party clients instead of custom point-to-point solution. 'High volume' was not even a thing nor the 'Publish After Commit' feature and everything was pretty much experimental, which meant monitoring and debugging events was a nightmare and had to rely on system built by someone else.

Soon people started building and installing app exchange packages with "pretty" UIs to monitor events. However, the whole idea of installing app exchange packages just to see some events was kind of dumb, *a bit over the top* and cumbersome to me. Being a developer, I could not help but write a simple subscriber myself that allows me to test platform events and tweak it exactly how I want when necessary to integrate in other system.

It's generic and anyone can run and monitoring the events straight from their command line using node. How much useful this is now - I will leave this up to the readers/developers. I am sure there are more better tools out there now. Thanks for stopping by.

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
