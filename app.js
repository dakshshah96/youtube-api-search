/* YouTube API Key: AIzaSyCoejMFrTxc93iRK2MkuaSwHQHdm2BvqsI */

var YT_BASE_URL = 'https://www.googleapis.com/youtube/v3/search/';
var YT_API_KEY = 'AIzaSyCoejMFrTxc93iRK2MkuaSwHQHdm2BvqsI';

function getDataFromApi(searchTerm, callback) {
    var query = {
        part: 'snippet',
        key: YT_API_KEY,
        q: searchTerm,
        maxResults: 6,
        type: 'video'
    }

    $.getJSON(YT_BASE_URL, query, callback);
}


function displayYouTubeSearchData(data) {

    /* YouTube API access
    /
    /  1. Get description: data.items[0].snippet.description;
    /  2. Get channel title: data.items[0].snippet.channelTitle;
    /  3. Get channel ID: data.items[0].snippet.channelId;
    /  4. Get publish date: data.items[0].snippet.publishedAt;
    /  5. Get video title: data.items[0].snippet.title;
    /  6. Get small thumbnail: data.items[0].snippet.thumbnails.default.url;
    /  7. Get medium thumbnail: data.items[0].snippet.thumbnails.medium.url;
    /  8. Get high thumbnail: data.items[0].snippet.thumbnails.high.url;
    /  9. Get video ID: data.items[0].id.videoId;
    / 
    */

    var currentImage = '';
    var colNumber = 0;
    if (data.items.length !== 0) {
        data.items.forEach(function(item, index) {
            currentImage = '<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '"><img src="' + item.snippet.thumbnails.high.url + '" title="' + item.snippet.title + '"></a>';
            colNumber = index + 1;
            $('.col-' + colNumber).html(currentImage);
        });
    } else {
        resultElement += '<p>No results</p>';
    }
}

function searchSubmit() {
    $('#js-youtube-search-form').submit(function(event) {
        event.preventDefault();
        var userEntry = $(this).find('#search-entry').val();
        getDataFromApi(userEntry, displayYouTubeSearchData);
    });
}

$(function() { searchSubmit(); });
