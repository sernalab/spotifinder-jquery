$( document ).ready(function() {
    $('.artists').hide();
    $('.albums').hide();
    $('.tracks').hide();
});
//Artists

$('#search-artist').on('click', function(e) {
    e.preventDefault()
    $('a[id=name_artist]').show();
    var nameArtist = $('#artist-name').val()
    var urlSearchArtist = 'https://api.spotify.com/v1/search?type=artist&query=' + nameArtist

    $.ajax({
        url: urlSearchArtist,
        success: function(data) {
            var artistsFound = data.artists.items // we create a filter(data.artists.items) we just want items in our array of objects
            var optionsArtists = '<option selected disabled>Select an Artist</option>' //we'll put all the option artist here

            artistsFound.forEach(function(artistData) { //now with our array filtered and full of artists searched previously, can create and put the results
                optionsArtists += '<option value="' + artistData.id + '">' + artistData.name + '</option>'
            })

            $('#artists-selection').html(optionsArtists);
        }
    })
    $('.artists').show();
})

// Albums

$('#artists-selection').on('change', function(e) {
    var idArtist = $(this).val();
    var urlAlbums = 'https://api.spotify.com/v1/artists/' + idArtist + '/albums'
    $.ajax({
        url: urlAlbums,
        success: function(data) {
            var albumsFound = data.items
            var optionsAlbums = '<option selected disabled>Select an album</option>'

            albumsFound.forEach(function(albumData) {
                optionsAlbums += '<option value="' + albumData.id + '">' + albumData.name + '</option>'
            })
            $('#albums-selection').html(optionsAlbums)
        }
    })
    $('.albums').show();
    // $.ajax({
    //     url: urlSearchArtist,
    //     success: function(data) {
    //         console.log(data.artists.items.images)//no me muestra el console.log de images, de items OK
            
    //     }
    // })
})

// Tracks

$('#albums-selection').on('change', function(e) {
    var idAlbum = $(this).val();
    urlTracks = 'https://api.spotify.com/v1/albums/' + idAlbum + '/tracks'

    $.ajax({
        url: urlTracks,
        success: function(data) {
            var tracksFound = data.items
            var listTracks = ''

            tracksFound.forEach(function(trackData) {
                listTracks += '<li class="list-group-item"><a href="' + trackData.external_urls.spotify + '" target="_blank">' + trackData.name + '</a></li>'
            })
            $('#tracks-selection').html(listTracks)
        }
    })
    $('.tracks').show();
})

// Covers

$('')
