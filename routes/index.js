var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended: false});
var db = require('./DataBaseModules/query.js');

router.use(function(req, res) {

    //spilt the url to get the information about the songs
    var reqURLObj = req.url.split('/');

    var language = reqURLObj[1];
    var page = reqURLObj[2];
    var title = reqURLObj[3];

    if( req.method == 'GET' && req.url == '/') {
        db.getHomePage(res);
    }
    else if( req.method == 'GET' && page == 'album') {
        db.getAlbum(title.replace(/-/g,' '), res);
    }
    else {
        res.render('dummy',{msg : "error"});
        res.end();
    }

});


module.exports = router;
