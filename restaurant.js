
var cityInput = "rahway";

var cityURL = "https://developers.zomato.com/api/v2.1/cities?count=12&q=" + cityInput;

$.ajax({
    url: cityURL,
    method: "GET",
    beforeSend: function (request) {
        request.setRequestHeader("user-key", "173297606dd309e858d947e8c0e0562c");
    },
}).then(function (response) {

    console.log(response.location_suggestions[0].id);
    var cityId = response.location_suggestions[0].id
    var searchURL = "https://developers.zomato.com/api/v2.1/search?count=8&entity_id=" + cityId + "&entity_type=city";
    console.log(searchURL);


    $.ajax({
        url: searchURL,
        method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("user-key", "173297606dd309e858d947e8c0e0562c");
        },
    }).then(function (result) {

        console.log(result);
        for (var i = 0; i < result.restaurants.length; i++) {

            var createCardContainer = $("<div>").addClass("col s12 l3").attr("id", "card" + i);
            $("#results").append(createCardContainer);
            var containerId = $("#card" + i);
            var createCard = $("<div>").addClass("card large");
            var createCardImg = $("<div>").addClass("card-image");
            var createCardContent = $("<div>").addClass("card-content");
            var createCardAction = $("<div>").addClass("card-action");

            var results = result.restaurants[i];

            createCardImg.append($("<img>").addClass("responsive-image").attr("src", results.restaurant.thumb))

            createCardImg.append($("<span>").addClass("card-title").text(results.restaurant.name))

            console.log(createCardImg)

            createCard.append(createCardImg);

            var resRatingNum = results.restaurant.user_rating.aggregate_rating;
            var resRatingStr = results.restaurant.user_rating.rating_text;
            createCardContent.append($("<p>").addClass("resRating").text("Restaurant Rating: " + resRatingNum + " " + resRatingStr).css('text-align', 'left'))
            var resAddr = results.restaurant.location.address;
            var resPhone = results.restaurant.phone_numbers;
            createCardContent.append($("<p>").addClass("resInfo").html('Address: ' + resAddr + '<br>' + '<i class="material-icons">phone</i> ' + resPhone))
            createCard.append(createCardContent);

            var resLink = results.restaurant.url;
            createCardAction.append($("<a>").attr("href", resLink).text('See More').attr("target", "_blank"))

            createCard.append(createCardAction);

            containerId.append(createCard);










        }


    });

});
