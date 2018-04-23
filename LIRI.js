// Module Imports

require("dotenv").config();
const keys = require("./keys.js");

// Key Information Retrieval

const spotify = keys.spotify;
const client = keys.twitter;

// User Command

const userArg = process.argv[2];

switch (userArg) {
    case "my-tweets":
        break;
    case "spotify-this-song":
        break;
    case "movie-this":
        break;
    case "do-what-it-says":
        break;
}