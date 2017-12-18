var express = require('express');
var router = express.Router();

//var songs = JSON.stringify(currentSongPlayList);

console.log("I am in album.. router");


router.post('/hindi/album', function(req, res, next) {
  //res.render('index', { title: 'Form' });
  console.log("yeah... I di")
});



module.exports = router;
