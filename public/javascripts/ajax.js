$(document).ready(function() {

    //this event will fired when mouse is clicked on language
    // $('.song_list_wrapper .list-header .right-side a').on('click', function() {
    //       var currentPageLocation = window.location.href;
    //       console.log(currentPageLocation);
    //       var lang = $(this).text();
    //       console.log(lang);
    //       var fullURL = currentPageLocation + lang;
    //       console.log(fullURL);
    //       $(this).text('english');
    //       $(this).attr('href', fullURL);
    //       //window.location.assign(fullURL);
    // });


    //this function will be fired when user cliks on the category page elements
    $('.song-category .song-category-all .category a').on('click' , function() {
        var ref = $(this).attr('href');
        var url = window.location.href;
        var fullURL = url + ref;
        window.location.assign(fullURL);
      //  window.location.replace(fullURL);
        return true;
    });


    //this event will be fired when an album is clicked
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

          //var lan = $('.list-header .right-side a').text();

          var fullURL = ref + '/' + title;

          window.location.assign(fullURL);   //usign this we can navigate to the previous page
          //window.location.replace(fullURL);//but in this case we can't
          //discussion of the function is available at :: https://stackoverflow.com/questions/503093/how-to-redirect-to-another-webpage

    });

});
