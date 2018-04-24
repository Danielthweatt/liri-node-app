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

const userArg1 = process.argv[2];

// Response to User Command

switch (userArg1) {
    case 'my-tweets':
        client.get('statuses/home_timeline', function(error, tweets, response){
            if (error) {
                console.log(`Error: ${error}`);
            } else {
                console.log("Here are your 20 most recent tweets:");
                tweets.forEach(function(tweet){
                    console.log(`Created on ${tweet.created_at}: ${tweet.text}`);
                });
            }
        });
        break;
    case 'spotify-this-song':
        let spotifyQueryString;
        if (process.argv.length === 3) {
            console.log('Because you did not enter a song to search Spotify for, here is the info for "The Sign":');
            console.log(' Song Name: The Sign');
            console.log('  Album: The Sign (US Album) [Remastered]');
            console.log('   Artist: Ace of Base');
            console.log('   Preview: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=b6e68f2cb049416ab7b0e04c7f5eed53');
        } else if (process.argv.length === 4) {
            spotifyQueryString = process.argv[3];
        } else {
            spotifyQueryString = process.argv[3];
            for (let i = 4; i < process.argv.length; i++) {
                spotifyQueryString += ` ${process.argv[i]}`;
            }
        }
        if (spotifyQueryString) {
            spotify.search({
                type: 'track', 
                query: spotifyQueryString
            }, function(error, data){
                if (error) {
                    console.log(`Error: ${error}`);
                }  else {
                    if (data.tracks.total > 0) {
                        console.log('Here are (up to) 20 of the top search results for your song from Spotify:');
                        console.log(` Song Name: ${spotifyQueryString}`);
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
        let omdbQueryString;
        if (process.argv.length === 3) {
            console.log('Because you did not enter a song to search Spotify for, here is the info for "Mr. Nobody":');
            console.log('Title: Mr. Nobody');
            console.log('Release Year: 2009');
            console.log('IMDB Rating: 7.9/10');
            console.log('Rotten Tomatoes Rating: 66%');
            console.log('Countries Produced In: Belgium, Germany, Canada, France, USA, UK');
            console.log('Language: English, Mohawk');
            console.log(`Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.`);
            console.log('Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham');
        } else if (process.argv.length === 4) {
            omdbQueryString = process.argv[3];
        } else {
            omdbQueryString = process.argv[3];
            for (let i = 4; i < process.argv.length; i++) {
                omdbQueryString += ` ${process.argv[i]}`;
            }
        }
        if (omdbQueryString) {
            request(`https://www.omdbapi.com/?t=${omdbQueryString}&y=&plot=short&apikey=trilogy`, function(error, response, body){
                if (error) {
                    console.log(`Error: ${error}`);
                } else {
                    body = JSON.parse(body);
                    if (body.Error === 'Movie not found!') {
                        console.log('Sorry! It looks like IMDB did not return any search results for that movie. :(');
                    } else {
                        let imdbRating;
                        let rtRating;
                        body.Ratings.forEach(function(elem){
                            if (elem.Source === 'Internet Movie Database') {
                                imdbRating = elem.Value;
                            } else if (elem.Source === 'Rotten Tomatoes') {
                                rtRating = elem.Value;
                            }
                        });
                        console.log('Here is the search result for your movie from IMDB:');
                        console.log(` Title: ${body.Title}`);
                        console.log(` Release Year: ${body.Year}`);
                        if (imdbRating) {
                            console.log(` IMDB Rating: ${imdbRating}`);
                        }
                        if (rtRating) {
                            console.log(` Rotten Tomatoes Rating: ${rtRating}`);
                        }
                        console.log(` Countries Produced In: ${body.Country}`);
                        console.log(` Language: ${body.Language}`);
                        console.log(` Plot: ${body.Plot}`);
                        console.log(` Actors: ${body.Actors}`);
                    }
                }
            });
        }
        break;
    case 'do-what-it-says':
        break;
}