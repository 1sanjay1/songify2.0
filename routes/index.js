var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended: false});

var listOfAlbums = [
  {title : 'Tiger Zinda Hai', imageURL : 'https://a10.gaanacdn.com/images/albums/91/2030791/crop_175x175_1513067280_2030791.jpg', director: 'Sanjay Raz'},
  {title : 'Fukery Returns', imageURL : 'https://i.ytimg.com/vi/Iez0g7fpgaQ/maxresdefault.jpg', director : 'Abhishek Verma'},
  {title : '1921', imageURL : "https://www.songsmp3.co/assets/images/1/93826-Sunn%20Le%20Zara%20(1921).JPG", director : 'Rohit Kumar'},
  {title : 'Aksar 2', imageURL : 'https://pbs.twimg.com/media/DNxHc-yVwAEoibE.jpg', director : "I don't know"}
];

var songObj = [
  {title : 'Tiger Zinda Hai', imageURL : 'https://a10.gaanacdn.com/images/albums/91/2030791/crop_175x175_1513067280_2030791.jpg', director: 'Sanjay Raz'},
  {song_title : 'Daata Tu', singer : 'Shreya Ghoshal, Vishal and Shekhar', songURL : '/songs/hindi/TigerZindaHai/Daata Tu.mp3', duration: '04:12'},
  {song_title : 'Dil Diyan Gallan', singer : 'Irshad Kamil', songURL : '/songs/hindi/TigerZindaHai/Dil Diyan Gallan.mp3', duration: '04:18'},
  {song_title : 'Swag Se Swagat', singer : 'Irshad Kamil', songURL : '/songs/hindi/TigerZindaHai/Swag Se Swagat.mp3', duration: '04:01'},
  {song_title : 'Zinda Hai', singer : 'Sukhwinder,Raftaar and Vishal', songURL : '/songs/hindi/TigerZindaHai/Zinda Hai.mp3', duration: '04:13'}
];

var songObj2 = [
  {title: 'Fukery Returns', imageURL : 'https://i.ytimg.com/vi/Iez0g7fpgaQ/maxresdefault.jpg', director : 'bhansali'},
  {song_title : 'Ishq De Fanniyar', singer : 'Pulkit Samrat, Priya and Jyotica', songURL : '/songs/hindi/FukeryReturns/Ishq De Fanniyar.mp3', duration : '2:45'},
  {song_title : 'Mehbooba', singer : 'Mohammed Rafi, Neha Kakkar, Raftaar', songURL : '/songs/hindi/FukeryReturns/Mehbooba.mp3', duration : '3:09'},
  {song_title : 'Peh Gaya Khalara', singer : 'Pulkit S, Varun S, Manjot Singh', songURL : '/songs/hindi/FukeryReturns/Peh Gaya Khalara.mp3', duration : '3:18'}
];

router.use(function(req, res) {

    //spilt the url to get the information about the songs
    var reqURLObj = req.url.split('/');

    var language = reqURLObj[1];
    var page = reqURLObj[2];
    var title = reqURLObj[3];

    if( req.method == 'GET' && req.url == '/') {
        res.render('index', { title: "Albums", listOfAlbums : listOfAlbums });
    }
    else if( req.method == 'GET' && page == 'album') {
      if( title.replace(/-/g,' ') == "Tiger Zinda Hai") {
          console.log(title);
          res.render('playlist', { songObj : songObj });
      }else if (title.replace(/-/g,' ') == "Fukery Returns") {
          res.render('playlist', { songObj : songObj2 });
      } else {
          res.render('dummy', {msg : "No result found "});
      }
    }
    else {
        res.render('dummy',{msg : "error"});
        res.end();
    }

});




module.exports = router;
