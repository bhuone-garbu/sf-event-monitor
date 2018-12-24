var config = {};
var oauth_settings = {};

config.oauth_url = 'https://test.salesforce.com/services/oauth2/token';

// these are OAuth credentials -- use this according to the oauth_url and sf org
oauth_settings.client_id = 'client_id';
oauth_settings.client_secret = 'client_secret';
oauth_settings.user_name = 'username';
oauth_settings.password = 'some_password';
oauth_settings.grant_type = 'password';

config.oauth_settings = oauth_settings;

module.exports = config;
