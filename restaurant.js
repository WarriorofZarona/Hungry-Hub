
var cityInput = "New York City"

var cityURL = "https://developers.zomato.com/api/v2.1/cities?q=" + cityInput;

$.ajax({
    url: cityURL,
    method: "GET",
    beforeSend: function (request) {
        request.setRequestHeader("user-key", "173297606dd309e858d947e8c0e0562c");
    },
}).then(function (response) {

    console.log(response.location_suggestions[0].id);
    var cityId = response.location_suggestions[0].id
    var searchURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityId + "&entity_type=city";
    console.log(searchURL);


    $.ajax({
        url: searchURL,
        method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("user-key", "173297606dd309e858d947e8c0e0562c");
        },
    }).then(function (result) {
        console.log(result);
        var card_title = result.restaurants[0].restaurant.name;
        console.log(card_title);
        $(".card-title").text(card_title);

        var resLink = result.restaurants[0].restaurant.url;
        console.log(resLink);
        $('a').attr("target", "_blank");
        $('a').attr("href", resLink).text('For more Information Click Here');

        var resImg = result.restaurants[0].restaurant.thumb;
        console.log(resImg);
        $('img').addClass('response_img').attr('src', resImg).attr('alt', 'Restaurant Image');


        var resRatingNum = result.restaurants[0].restaurant.user_rating.aggregate_rating;
        var resRatingStr = result.restaurants[0].restaurant.user_rating.rating_text;
        console.log(resRatingNum, resRatingStr);
        $('p').addClass('rating');

        $('.rating').empty().text("Restaurant Rating: " + resRatingNum + " " + resRatingStr).css('text-align', 'left');


    });

});
