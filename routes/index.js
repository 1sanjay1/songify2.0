var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended: false});

var currentSongPlayList = ['Piya-O-Re-Piya.mp3', 'love-me-like.mp3','loveaajkal05.mp3','loveaajkal04.mp3'];

var second = ['loveaajkal05.mp3','loveaajkal04.mp3'];

//var songs = JSON.stringify(currentSongPlayList);

var songs = [{
    'name': 'Buddhu Sa Mann Hai',
    'artist': 'Amaal Malik, Armaan Malik',
    'album': 'Kapoor & Sons',
    'duration': '3:26',
    'fileName': 'song1.mp3',
    'image' : 'song1.jpg'
},
{
    'name': 'Jaaniya O Jaaniya',
    'artist': 'Sidharth Basrur',
    'album': 'Haunted',
    'duration': '5:07',
    'fileName': 'song2.mp3',
    'image' : 'song2.jpg'
},
{
    'name': 'Safarnama',
    'artist': 'Lucky Ali',
    'album': 'Tamasha',
    'duration': '4:11',
    'fileName': 'song3.mp3',
    'image' : 'song3.jpg'
},
{
    'name': 'Why Not Me',
    'artist': 'Enrique Iglesias',
    'album': 'Euphoria',
    'duration': '3:38',
    'fileName': 'song4.mp3',
    'image' : 'song4.jpg'
}];

/* GET home page. */
// router.get('/', function(req, res, next) {
//
// });


router.use(function(req, res) {

    //spilt the url to get the information about the songs
    var reqURLObj = req.url.split('/');

    var language = reqURLObj[1];
    var page = reqURLObj[2];
    var title = reqURLObj[3];

    if( req.method == 'GET' && req.url == '/') {
        res.render('index', { title: "form", songObj : currentSongPlayList });
    }
    else if( req.method == 'GET' && page == 'album') {
        res.render('playlist', { songObj : currentSongPlayList });
    }
    else {
        res.render('dummy',{msg : "error"});
        res.end();
    }

});




module.exports = router;
