require('dotenv').config();
var express = require('express');
var app = express();
var server = require('http').Server(app);
var Twitter = require('twitter');
var io = require('socket.io')(server);

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const port = 3000;

server.listen(port, (err) => {
  if(err) {
    console.log(err);
    return err;
  }
  else {
    console.log("Express server listening on port " + port);
  }
});

var stream_data = {
  track: 'christmas'
}

client.stream('statuses/filter', stream_data, function(stream) {
  stream.on('data', function(event) {
    console.log(event);
  });

  stream.on('error', function(error) {
    throw error;
  });
});
