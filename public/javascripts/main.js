var currentSong = 0;

function setSongGlobalObject(obj) {
  currentSongPlayList = obj;
  console.log("in main .js file = " + obj);
}

////Initialization of the app with default settings
window.onload = function() {

  IntervalId = 1; //default Initialization of interval id

  updateCurrentTime(0);
  var audio = $('#audio');
  var song  = '/songs/' + currentSongPlayList[currentSong];
  audio.attr('src', song);


/*this function is fired whenever a song is clicked. It does two things: play and pause the song and change the icon.
if song is already running then song will be paused otherwise played */
function toggleSong(){
    var song = document.querySelector('audio');
    if (song.paused == true) {
      playSong();
    }
    else {
      pauseSong();
    }
}

function playSong() {

  var song = document.querySelector('audio');
  $('.play-icon').removeClass('fa-play').addClass('fa-pause');//removes play icon and adds pause icon
  song.play();
  IntervalId = setInterval(function() {
  updateCurrentTime();
  },1000); //1000 represents time in milliseconds
}
function pauseSong() {
  var song = document.querySelector('audio');
  $('.play-icon').removeClass('fa-pause').addClass('fa-play');//removes pause icon and adds play icon
  song.pause();
  clearInterval(IntervalId);
}

//update audio source
function updateAudioSource(song) {
  var audio = $('#audio');
  audio.attr('src', song);
  playSong();
}

/************************End ***************************************/


/*````````````````````````````````````````````````````````````````````````````*/
/*````````````````````````````````````````````````````````````````````````````*/
/************************ Event Handling **************************************/
/*````````````````````````````````````````````````````````````````````````````*/
/*````````````````````````````````````````````````````````````````````````````*/
// change current song to the next song
$('.fa-step-forward').on('click', function() {
  pauseSong();
  var totalSong = currentSongPlayList.length;
  currentSong += 1;
  console.log("current song  = " + currentSong);
  if(shuffleSong == 1) {
    currentSong = rendomSongNum();
  }
  else if( currentSong < totalSong) {
    ;
  } else {
    if(repeatSong == 1) { // repeat the song list again
        currentSong = 0;
    } else {
        currentSong = totalSong - 1;
    }
  }
  var song  = '/songs/' + currentSongPlayList[currentSong];
  updateAudioSource(song);
});

// change current song to the previous song
$('.fa-step-backward').on('click', function() {
  pauseSong();
  var totalSong = currentSongPlayList.length;
  currentSong -= 1;
  console.log("current song  = " + currentSong);
  if(shuffleSong == 1) {
    currentSong = rendomSongNum();
  }
  else if( currentSong >= 0) {
    ;
  } else {
    if(repeatSong == 1) { // repeat the song list again
        currentSong = totalSong - 1;
    } else {
        currentSong = 0;
    }
  }
  var song  = '/songs/' + currentSongPlayList[currentSong];
  updateAudioSource(song);
});

// user interaction icons
$('.play-icon').on('click', function() {
  toggleSong();
});

//repeat the song list if repeat icon is selected
var repeatSong = 0;
$('.fa-repeat').on('click', function() {
  if(repeatSong == 0) {
    repeatSong = 1;
    $(this).removeClass('inactive');
  } else {
    repeatSong = 0;
    $(this).addClass('inactive');
  }
});

//Shuffle the song list
var shuffleSong = 0;
$('.fa-random').on('click', function() {
  if(shuffleSong == 0) {
    shuffleSong = 1;
    $(this).removeClass('inactive');
  } else {
    shuffleSong = 0;
    $(this).addClass('inactive');
  }
});

//this event will fire when user clicks on the song row itself in the song list
$('.song_list table tbody tr').on('click', function() {
  var currentSong = $(this).find(':first-child').text() - 1;
  var song  = '/songs/' + currentSongPlayList[currentSong];
  // updateAudioSource(song);
  var audio = document.querySelector('audio');
  var currentSongSource = audio.src;

  if (currentSongSource.search(song) == -1) {
    audio.src = song;
  }
  toggleSong();
});

//function to manage the play and pause functionality using the spacebar(keyboard keys)
$('body').on('keypress',function(event){
    var target = event.target;
    if(event.keyCode == 32 && target.tagName!='INPUT') {
      toggleSong();
    }
});

/************************* End of Event Handling ******************************/





/*````````````````````````````````````````````````````````````````````````````*/
/*````````````````````````````````````````````````````````````````````````````*/
/************************ Time Format Module **********************************/
/*````````````````````````````````````````````````````````````````````````````*/
/*````````````````````````````````````````````````````````````````````````````*/

//Working on progressbar and timining of the song. compute the elapsed time and remaining time
// and show on the page
// this functionn converts seconds in a fancy format
function fancyTimeFormat(time)
{
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);//isko use nhi kiya
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;
    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : ""); //ret variable mey store krliya
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


function rendomSongNum() {
  var min = 0;
  var max = currentSongPlayList.length - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min);
}

//updates the current time and the duration of the songs.
//flag is used for first time updation
function updateCurrentTime(flag){
    console.log('this is awesome ');
    var song = document.querySelector('audio');
    var currentTime = Math.floor(song.currentTime);//removes digits present after decimal
    var duration = Math.floor(song.duration);//same as above
    var bar=(currentTime*100)/duration;//for progres bar
    if(flag == 0) //initial state
      duration = 0;
    currentTime = fancyTimeFormat(currentTime);
    duration = fancyTimeFormat(duration);
    $('.time-elapsed').text(currentTime);
    $('.song-duration').text(duration);
    Progressbar(bar);
    if( currentTime!= "0:00" && currentTime == duration) {
      console.log("song has been completed..");
      $('.play-icon').removeClass('fa-pause').addClass('fa-play');
      clearInterval(IntervalId);

      totalSong = currentSongPlayList.length;
      currentSong++;

      if(shuffleSong == 1) { //if shuffle is on then song always will be played
        currentSong = rendomSongNum();
      } else if( currentSong < totalSong) {
          ;
      } else {
        if(repeatSong == 1) { // repeat the song list again
            currentSong = 0;
        } else {
            currentSong = totalSong - 1;
            return;
        }
      }
      var song  = '/songs/' + currentSongPlayList[currentSong];
      updateAudioSource(song);
    }
}

// increase width of the progress bar according to the song duration
function Progressbar(bar){
    var prog = document.querySelector('.progress-filled');
    prog.style.width= bar +"%";//final width css
}
// get current time by clicking on the progress bar
$('.player-progress').click(function(event){
    var $this=$(this);
    var selectedLength= event.pageX-$this.offset().left;//jitni length se song play krna h
    var totalLength=$this.width();//song ka total span
    var width=(selectedLength/totalLength)*100;
    var song=document.querySelector('audio');
    song.currentTime=(song.duration*width)/100;

    //change width of progressbar when mouse is clicked
    var currentTime = Math.floor(song.currentTime);//removes digits present after decimal
    var duration = Math.floor(song.duration);//same as above
    var bar=(currentTime*100)/duration;//for progres bar
    Progressbar(bar);
});
/*********************** End of Time Format Module ****************************/


/*````````````````````````````````````````````````````````````````````````````*/
/*````````````````````````````````````````````````````````````````````````````*/
/************************ Volume Module ***************************************/
/*````````````````````````````````````````````````````````````````````````````*/
/*````````````````````````````````````````````````````````````````````````````*/

/*when mouse is hover on the volume icon then the volume input will be shown
and vice-versa*/
$('.responsive-pane i.fa, #vol-control').hover(
  function() {
    $('.responsive-pane #vol-control').removeClass('hidden');
  },
  function() {
    $('.responsive-pane #vol-control').addClass('hidden');
  }
);

//setting the volume functionality
var values = document.querySelector('#vol-control');
var song = document.querySelector('audio');
values.addEventListener('change',setVolume)//watching the change

var currentVolume = 0;
$('.responsive-pane i').on('click',function(){
    if(song.volume != 0) {
      $('.responsive-pane i').removeClass('fa-volume-up').addClass('fa-volume-off');//chaining
      currentVolume = song.volume;
      song.volume=0;
    } else {
      $('.responsive-pane i').removeClass('fa-volume-off').addClass('fa-volume-up');//chaining
      song.volume = currentVolume;
    }
});

function setVolume(){
    song.volume = this.value / 100;//converts to values in btw 0 n 1
    if(this.value < 50){//font awesome k icon change krne k liye
        $('.responsive-pane i').removeClass('fa-volume-up').addClass('fa-volume-down');//chaining
        $('.responsive-pane span').text(' ');
        values=this.value;
    }
    else if(this.value > 50){
        $('.responsive-pane i').removeClass('fa-volume-down').addClass('fa-volume-up');
        $('.responsive-pane span').text(' ');
        values=this.value;
    }//changing the fa icon
}
/************************ End of Volume Module ********************************/




/*````````````````````````````````````````````````````````````````````````````*/
/*````````````````````````````````````````````````````````````````````````````*/
/************************ Initialization of the Application *******************/
/*````````````````````````````````````````````````````````````````````````````*/
/*````````````````````````````````````````````````````````````````````````````*/



}

/************************ End of Initialization Module ************************/
