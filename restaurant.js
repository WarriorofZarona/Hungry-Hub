$(document).ready(function () {
    var currentIndex = 0

    $("#search-input").on("keypress", function (event) {
        if (event.which == 13) {
            event.preventDefault();
            currentIndex = 0;
            $(".navigate").removeClass("active orange");
            $("#page1").addClass("active orange");
            loadResults(currentIndex);
        };
    });




    $(".navigate").click(function () {
        if ($(this).attr("data-page") === "next") {
            console.log($(this).attr("data-page"))
            if (currentIndex === 4) {
                currentIndex = 4;
                loadResults(currentIndex);
            } else {
                currentIndex = currentIndex + 1;
                console.log("Current index is now " + currentIndex);
                loadResults(currentIndex);
                $(".navigate").removeClass("active orange");
                for (var i = 0; i < 5; i++) {
                    if (currentIndex == i) {
                        $("#page" + (currentIndex + 1)).addClass("active orange");
                    }
                }
            }
        } else if ($(this).attr("data-page") === "prev") {
            console.log($(this).attr("data-page"))
            console.log(currentIndex);
            if (currentIndex === 0) {
                currentIndex = 0
                console.log("Current index is " + currentIndex)
                loadResults(currentIndex)
            } else {
                currentIndex = currentIndex - 1;
                console.log("Current index is " + currentIndex)
                loadResults(currentIndex)
                if ($('.navigate').hasClass('active orange')) {
                    $('.navigate').removeClass('active orange');
                }
                for (var i = 0; i < 5; i++) {
                    if (currentIndex == i) {
                        $("#page" + (currentIndex + 1)).addClass("active orange");
                    }
                    if ($(this).hasClass("disabled")) {
                        $(this).removeClass("disabled");
                        $(this).addClass("waves-effect");
                    }
                }
            }
        } else {
            console.log("Page is " + $(this).attr("data-page"))
            currentIndex = parseInt($(this).attr("data-page") - 1);
            console.log("Current index is " + currentIndex);
            loadResults(currentIndex);
            if ($('.navigate').hasClass('active orange')) {
                $('.navigate').removeClass('active orange');
                $(this).addClass('active orange');
            } else {
                $(this).addClass('active orange');
            }
        }
        checkDisabled();
        function checkDisabled() {
            if ($("#page1").hasClass("active orange")) {
                console.log("adding disabled to prev")
                $("#prev").addClass("disabled");
                $("#next").removeClass("disabled");
            } else if ($("#page5").hasClass("active orange")) {
                console.log("adding disabled to next")
                $("#next").addClass("disabled");
                $("#prev").removeClass("disabled");
            } else {
                console.log("removing disabled class")
                $(".navigate").removeClass("disabled");
            }
        }
    })



    function loadResults(index) {

        $("#results").empty();
        var pages = [{
            page: 1,
            start: 0,
        },
        {
            page: 2,
            start: 12,
        },
        {
            page: 3,
            start: 24,
        },
        {
            page: 4,
            start: 36,
        },
        {
            page: 5,
            start: 48,
        }];

        $("#search-input").empty();
        var cityInput = $("#search-input").val();
        console.log(cityInput);


        var cityURL = "https://developers.zomato.com/api/v2.1/cities?count=12&q=" + cityInput;
        console.log(cityURL);
        $.ajax({
            url: cityURL,
            method: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("user-key", "173297606dd309e858d947e8c0e0562c");
            },

        }).then(function (response) {


            console.log(response);//.location_suggestions[0].id);
            var cityId = response.location_suggestions[0].id
            var searchURL = "https://developers.zomato.com/api/v2.1/search?start=" + pages[index].start + "&count=12&entity_id=" + cityId + "&entity_type=city";
            console.log(searchURL);
            console.log(pages[index].start)

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
                    var createCard = $("<div>").addClass("card large hoverable");
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
                    createCardContent.append($("<p>").addClass("resRating").html('<i class="material-icons">star</i>' + "Restaurant Rating: " + resRatingNum + " " + resRatingStr).css('text-align', 'left'))
                    var resAddr = results.restaurant.location.address;
                    var resPhone = results.restaurant.phone_numbers;
                    createCardContent.append($("<p>").addClass("resInfo").html(' <i class="material-icons">location_on</i>  ' + resAddr + '<br>' + '<i class="material-icons">phone</i> ' + resPhone))
                    createCard.append(createCardContent);

                    var resLink = results.restaurant.url;
                    createCardAction.append($("<a>").attr("href", resLink).text('See More').attr("target", "_blank"))

                    createCard.append(createCardAction);

                    containerId.append(createCard);








                }

            })


        });

    };
});