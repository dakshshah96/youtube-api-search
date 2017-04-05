var YT_BASE_URL = 'https://www.googleapis.com/youtube/v3/search/';
var YT_API_KEY = 'AIzaSyCoejMFrTxc93iRK2MkuaSwHQHdm2BvqsI';
var PREV_TOKEN = '';
var NEXT_TOKEN = '';

function makeQueryObject(searchTerm, task) {
    var query = {
        part: 'snippet',
        key: YT_API_KEY,
        q: searchTerm,
        maxResults: 6,
        type: 'video'
    }

    if (task === 'next') {
        query.pageToken = NEXT_TOKEN;
    }

    if (task === 'prev') {
        query.pageToken = PREV_TOKEN;
    }

    return query;
}

function getDataFromApi(query, callback) {
    $.getJSON(YT_BASE_URL, query, callback);
}

function displayYouTubeSearchData(data) {

    PREV_TOKEN = data.prevPageToken;
    NEXT_TOKEN = data.nextPageToken;

    var currentImage = '';
    var colNumber = 0;
    if (data.items.length !== 0) {
        $('#no-results').attr('hidden', true);
        $('#search-results').removeAttr('hidden');
        data.items.forEach(function(item, index) {
            currentImage = '<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '"><img src="' + item.snippet.thumbnails.high.url + '" title="' + item.snippet.title + '"></a><span class="see-more"><a href="https://www.youtube.com/channel/' + item.snippet.channelId + '" title="See more videos by ' + item.snippet.channelTitle + '">More by ' + item.snippet.channelTitle + '</a></span>';
            colNumber = index + 1;
            $('.col-' + colNumber).html(currentImage);

        });
    } else {
        $('#search-results').attr('hidden', true);
        $('#no-results').removeAttr('hidden');
    }
}

function searchSubmit() {
    $('#js-youtube-search-form').submit(function(event) {
        event.preventDefault();
        var userEntry = $(this).find('#search-entry').val();
        getDataFromApi(makeQueryObject(userEntry, 'submit'), displayYouTubeSearchData);

        $('.btn-next').click(function() {
            $('.btn-previous').removeAttr('disabled');
            getDataFromApi(makeQueryObject(userEntry, 'next'), displayYouTubeSearchData);
        });

        $('.btn-previous').click(function() {
            getDataFromApi(makeQueryObject(userEntry, 'prev'), displayYouTubeSearchData);
            if (PREV_TOKEN == undefined) {
                $('.btn-previous').attr('disabled', true);
            }
        });
    });
}

$(function() {
    searchSubmit();
});
