$(document).ready(function () {

    var currentIndex = 0
    $('select').formSelect();
    // Hides Footer
    $('.footer').hide();

    $("#search-input").on("keypress", function (event) {
        if (event.which == 13) {
            event.preventDefault();
            currentIndex = 0;
            $(".navigate").removeClass("active orange");
            $("#page1").addClass("active orange");
            loadResults(currentIndex);
        };
    });


    // Controls the navigation and active state of page numbers and search results
    $(".navigate").click(function () {
        // Controls what happens when next arrow is clicked
        if ($(this).attr("data-page") === "next") {
            if (currentIndex === 4) {
                currentIndex = 4;
                loadResults(currentIndex);
            } else {
                currentIndex = currentIndex + 1;
                loadResults(currentIndex);
                $(".navigate").removeClass("active orange");
                activeNav();
            };
            // Controls what happens when prev arrow is clicked
        } else if ($(this).attr("data-page") === "prev") {
            if (currentIndex === 0) {
                currentIndex = 0;
                loadResults(currentIndex);
            } else {
                currentIndex = currentIndex - 1;
                loadResults(currentIndex);
                // Controls which page is active
                if ($('.navigate').hasClass('active orange')) {
                    $('.navigate').removeClass('active orange');
                };
                activeNav();
            };
            // Controls page navigation and active status when clicking page #'s directly
        } else {
            currentIndex = parseInt($(this).attr("data-page") - 1);
            loadResults(currentIndex);
            if ($('.navigate').hasClass('active orange')) {
                $('.navigate').removeClass('active orange');
                $(this).addClass('active orange');
            };
        };
        checkDisabled();
        // Checks for disabled arrows and adds/removes when it reaches first or last page
        function checkDisabled() {
            if ($("#page1").hasClass("active orange")) {
                $("#prev").addClass("disabled");
                $("#next").removeClass("disabled");
            } else if ($("#page5").hasClass("active orange")) {
                $("#next").addClass("disabled");
                $("#prev").removeClass("disabled");
            } else {
                $(".navigate").removeClass("disabled");
            };
        };
        // Controls active state on pages when clicked on directly
        function activeNav() {
            for (var i = 0; i < 5; i++) {
                if (currentIndex == i) {
                    $("#page" + (currentIndex + 1)).addClass("active orange");
                };
            };
        };
    });


    function loadResults(index) {

        $('.footer').show();
        $("#results").empty();
        showPage();
        // Adds loading image animation
        function showPage() {
            $("#myDiv").html("<h3> Working on it!</h3>").show();
            var img = $("<img>");
            img.attr("src", "ryanLoading.gif")
            $("#myDiv").append(img);
        }

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



        var cityURL = "https://developers.zomato.com/api/v2.1/cities?count=12&q=" + cityInput;

        $.ajax({
            url: cityURL,
            method: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("user-key", "173297606dd309e858d947e8c0e0562c");
            },

        }).then(function (response) {

            var cuisine = $('select').val();



            var cityId = response.location_suggestions[0].id
            var searchURL = "https://developers.zomato.com/api/v2.1/search?start=" + pages[index].start + "&count=12&entity_id=" + cityId + "&entity_type=city";


            if (cuisine !== null) {
                searchURL += "&cuisines=" + cuisine;
            }

            $.ajax({
                url: searchURL,
                method: "GET",
                beforeSend: function (request) {
                    request.setRequestHeader("user-key", "173297606dd309e858d947e8c0e0562c");
                },
            }).then(function (result) {

                $("#myDiv").empty();


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