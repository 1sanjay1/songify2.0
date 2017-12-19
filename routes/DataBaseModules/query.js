var con = require('./connection');
var Q = require('Q');

//get home page with all albums
var getHomePage = function(res) {
    var allAlbums = "SELECT title, imageURL, director FROM album";
    con.query(allAlbums, function(err, result) {
        if(err) {
            console.log("Error in query : home page");
            return;
        } else {
            res.render('index', { title: "Home", listOfAlbums : result });
        }
    });
}

//get list of songs for a perticular album or movie
var getAlbum = function(title, res) {
    //get the album information
    var albumObj = "SELECT title, imageURL, director FROM album WHERE title = ?";
    //get the list of songs
    var songObj = "SELECT title as song_title, singer, location as songURL, duration FROM song WHERE id IN ( SELECT song_id FROM album_song WHERE album_id = ( SELECT id FROM album WHERE title = ?));"

    con.query(albumObj, title, function(err, result) {
        if(err) {
            console.log("Error : performing query for album");
            return;
        } else {
            albumObj = result;

            if(albumObj.length == 0){ //check if no data is available
                res.render('dummy', { msg : "No result found" });
                return; //should not preceed further
            }

            //Nested call-back functions for executing two queries
            con.query(songObj, title, function(err, result) {
                if(err) {
                    console.log("Error : performing query for song");
                    return;
                } else {
                    songObj = result;
                    songObj.splice(0, 0, albumObj[0]);
                    res.render('playlist', { songObj : songObj });
                }
            });

        }
    });

}

module.exports.getAlbum = getAlbum;
module.exports.getHomePage = getHomePage;
