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
        let queryString;
        if (process.argv.length === 3) {
            console.log('Default (because you did not enter a song to search Spotify for):')
            console.log(' Song Name: The Sign');
            console.log('  Album: The Sign (US Album) [Remastered]');
            console.log('   Artist: Ace of Base');
            console.log('   Preview: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=b6e68f2cb049416ab7b0e04c7f5eed53');
        } else if (process.argv.length === 4) {
            queryString = process.argv[3];
        } else {
            queryString = process.argv[3];
            for (let i = 4; i < process.argv.length; i++) {
                queryString += ` ${process.argv[i]}`;
            }
        }
        if (queryString) {
            spotify.search({
                type: 'track', 
                query: queryString
            }, function(error, data){
                if (error) {
                    console.log(`Error: ${error}`);
                }  else {
                    if (data.tracks.total > 0) {
                        console.log('Here are (up to) 20 of the top search results for your song from Spotify:');
                        console.log(` Song Name: ${queryString}`);
                        data.tracks.items.forEach(function(track){
                            console.log(`  Album: ${track.album.name}`);
                            track.album.artists.forEach(function(artist){
                                console.log(`   Artist: ${artist.name}`);
                            });
                            if (track.preview_url) {
                                console.log(`   Preview: ${track.preview_url}`);
                            }
                        });
                    } else {
                        console.log('Sorry! It looks like Spotify did not return any search results for that song. :(');
                    }
                }
            });
        }
        break;
    case 'movie-this':
        break;
    case 'do-what-it-says':
        break;
}