// $(document).ready(function() {
//
//   $('.song-category .animate-image').on('click', function() {
//     $('.songs-category').addClass('hidden');
//     $('.each-song-item').removeClass('hidden');
//   });
//
// });

$(document).ready(function() {

    $('.song-list .song-item .single-song > div').on('click', function() {
        var title = $(this).find('a').text().replace(/ /g, "-");
        console.log(title);

        $(function() {
            $.ajax({
                url: '/hindi/album/' + title,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                  console.log(data);
                }
            });

       });

    });

});
