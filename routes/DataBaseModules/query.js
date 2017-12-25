var con = require('./connection');

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
};

//get list of songs for a perticular album or movie
var getAlbum = function(title, res) {
    //get the album information
    var albumObj = "SELECT title, imageURL, director FROM album WHERE title = ?";
    //get the list of songs
    var songObj = "SELECT title as song_title, singer, location as songURL, duration, id FROM song WHERE id IN ( SELECT song_id FROM album_song WHERE album_id = ( SELECT id FROM album WHERE title = ?));"

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

};

//get list of categories of songs
var getCategoryList = function (res) {

    var query = "SELECT imageURL, name FROM category";
    con.query(query, function(err, result) {
        if(err) {
            console.log("Error : performing query with category table ");
        }
        else {
            console.log(result);
            res.render('category', {categoryObj : result});
        }
    });

};

//get all the songs which are related to a perticular category
var getCategorySongs = function(res, title) {

    var query = "SELECT title as song_title, singer, location as songURL, duration, id FROM song WHERE id IN ( SELECT song_id FROM category_song WHERE category_id = ( SELECT id FROM category WHERE name = ?))";

    con.query(query, title, function(err, result) {
        if(err) {
            console.log("Error : performing query with category song table ");
        }
        else {
            var secondQuery = "SELECT name as title, imageURL, director FROM category WHERE name = ?";
            con.query(secondQuery, title, function(err, result2) {
                if(err) {
                    console.log("Error : performing query with category table");
                }
                else {
                    result.splice(0,0, result2[0]);
                    res.render('playlist', {songObj : result});
                }
            });
        }
    });

};

var getNewReleaseSongs = function(res) {

    "SELECT name as title, imageURL, director FROM category WHERE name = ?"

    var obj = {title : 'New Releases', imageURL : 'https://www.mautic.org/wp-content/uploads/2015/06/mautic_new_release_1.1.png', director : '2017'};

    var query = "SELECT title as song_title, singer, location as songURL, duration, id, release_date FROM song WHERE release_date >= '2017-01-01' AND release_date != '0000-00-00' ORDER BY release_date DESC";

    con.query(query, function(err, result) {
        if(err) {
            console.log("Error : performing query with new releases songs");
            return ;
        } else {
            result.splice(0, 0, obj);
            res.render('playlist', {songObj : result});
        }
    });

};

module.exports.getAlbum = getAlbum;
module.exports.getHomePage = getHomePage;
module.exports.getCategoryList = getCategoryList;
module.exports.getCategorySongs = getCategorySongs;
module.exports.getNewReleaseSongs = getNewReleaseSongs;
