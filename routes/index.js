var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended: false});
var db = require('./DataBaseModules/query.js');

router.use(function(req, res) {

    //spilt the url to get the information about the songs
    var reqURLObj = req.url.split('/');

    var arg1 = reqURLObj[1];
    var title = reqURLObj[2];
    // var title = reqURLObj[3];

    console.log("arg1 = " + arg1);
    console.log("arg2 = " + title);
    console.log("req.url = " + req.url);

    if( req.method == 'GET' && req.url == '/') {
        db.getHomePage(res);
    }
    else if (req.method == 'GET' && arg1 == 'album') {
        db.getAlbum(title.replace(/-/g,' '), res);
    }
    else if( req.method == 'GET' && req.url == '/category') {
        db.getCategoryList(res);
        //res.render('category', {category : 'successful'});
     }
     else if (req.method == 'GET' && arg1 == 'category') {
        console.log("title = " + title);
        console.log("this is awesomme bro.............sdfsfd      sdfsdf        ");
        db.getCategorySongs(res, title);
     }
    // else if( req.method == 'GET' && page == 'album') {
    //     db.getAlbum(title.replace(/-/g,' '), res);
    // }
    else {
        res.render('dummy',{msg : "error"});
        res.end();
    }

});


module.exports = router;
