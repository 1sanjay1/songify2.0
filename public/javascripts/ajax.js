$(document).ready(function() {

    $('.song-list .song-item .single-song > div').on('click', function() {

          var title = $(this).find('a').text().split(/\s+/); //remove spaces

          var temp = [];
          for(var i = 0; i < title.length ; i++) {
              if(title[i] != "") {
                temp.push(title[i]);  //store tokens without spaces
              }
          }

          title = temp.join('-'); //add all token with '-' separated

          var ref = $(this).find('a').attr('href');

          var lan = $('.list-header .right-side a').text();

          var fullURL = lan + ref + '/' + title;

          window.location.assign(fullURL);   //usign this we can navigate to the previous page
          //window.location.replace(fullURL);//but in this case we can't
          //discussion of the function is available at :: https://stackoverflow.com/questions/503093/how-to-redirect-to-another-webpage

    });

});
