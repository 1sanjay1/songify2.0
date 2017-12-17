var express = require('express');
var router = express.Router();

var currentSongPlayList = ['Piya-O-Re-Piya.mp3', 'love-me-like.mp3','loveaajkal05.mp3','loveaajkal04.mp3'];

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

console.log("request to the server ...");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "form", songObj : currentSongPlayList });
});

router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Form' });
});



module.exports = router;
