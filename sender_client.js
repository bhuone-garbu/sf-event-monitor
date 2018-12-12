var http = require('http'),
    faye = require('faye');

var client = new faye.Client('http://localhost:8000/');
client.publish('/messages', {
  text: 'Hello world'
});
