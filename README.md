#LIRI
This is my first node application. 
##How to Use
Enter your command for LIRI in the command-line right 
after the command to open liri.js in node. You can enter 
one of the following commands: 'my-tweets', 'spotify-this-song', 
'movie-this', 'do-what-it-say'. For the middle two commands, 
you will also have to enter an argument representing either 
the song or movie (depending on the command) you want LIRI to 
search for. The 'my-tweets' command will tell LIRI to display 
your twenty most recent tweets. The 'spotify-this-song' 
command will tell LIRI to search Spotify for the song you enter 
and display the search results (up to twenty of them). The 
'movie-this' command will tell LIRI to search OMDB for the 
movie you enter and display the search result. Finally, the 
'do-what-it-says' command will tell LIRI to follow the 
command in the random.txt file. LIRI will save all past 
commands in the log.txt file. 
##Example Command
node liri.js movie-this Godzilla  
##Notes
Make sure to save your Twitter and Spotify API information 
that keys.js needs as variables in the environment using 
dotenv. 