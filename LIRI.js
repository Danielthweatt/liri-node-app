// Module Imports

require('dotenv').config();
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const request = require('request');

// Key Information Retrieval

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

// User Command

const userArg = process.argv[2];

// Response to User Command

switch (userArg) {
    case 'my-tweets':
        client.get('statuses/home_timeline', function(error, tweets, response){
            if (error) {
                console.log(`Error: ${error}`);
            } else {
                console.log("Here are my 20 most recent tweets:");
                tweets.forEach(function(tweet){
                    console.log(`Created on ${tweet.created_at}: ${tweet.text}`);
                });
            }
        });
        break;
    case 'spotify-this-song':
        break;
    case 'movie-this':
        break;
    case 'do-what-it-says':
        break;
}