//Recipe Search
$(document).ready(function () {
    $('select').formSelect();
    // Hides Footer
    $('.footer').hide();

    // Defining starting Index when API starts 
    var currentIndex = 0;
    // User types in a keyword here, and then presses the enter key, loadResults() does the AJAX call
    // displays the results through jQuery and Materialize framework cards
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

    // Controls AJAX call and response is displayed on cards
    function loadResults(index) {

        //Shows footer
        $('.footer').show();
        // Clears the results
        $("#results").empty();


        showPage();
        // Adds loading image animation
        function showPage() {
            $("#myDiv").html("<h3> Working on it!</h3>").show();
            var img = $("<img>");
            img.attr("src", "ryanLoading.gif")
            $("#myDiv").append(img);
        }


        // Takes uer input as the keyword for API Call, REQUIRED
        var keyWord = $("#search-input").val();

        // Sets parameters of results per page
        var pages = [{
            page: 1,
            from: 0,
            to: 12
        },
        {
            page: 2,
            from: 13,
            to: 25
        },
        {
            page: 3,
            from: 26,
            to: 38
        },
        {
            page: 4,
            from: 39,
            to: 51
        },
        {
            page: 5,
            from: 52,
            to: 64
        }];

        // API URL
        var queryURL = "https://api.edamam.com/search?app_id=2d10e9e9&app_key=041becfbb0cfe254d9b264eb2339c614&from=" + pages[index].from + "&to=" + pages[index].to + "&q=" + keyWord;
        $.ajax({

            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Clears loading Div
            $("#myDiv").empty();
            // Creates cards and displays results from API response
            for (var i = 0; i < response.hits.length; i++) {
                var createCardContainer = $("<div>").addClass("col s12 l2").attr("id", "card" + i);
                $("#results").append(createCardContainer);
                var containerId = $("#card" + i);
                var createCard = $("<div>").addClass("card medium hoverable");
                var createCardImg = $("<div>").addClass("card-image");
                var createCardContent = $("<div>").addClass("card-content");
                var createCardAction = $("<div>").addClass("card-action");
                // Use response.hits[0], using for loop to go through each result

                var result = response.hits[i];

                // This should display recipe image, to be used in img src
                createCardImg.append($("<img>").addClass("responsive-img").attr("src", result.recipe.image));
                // This should display recipe name
                createCardImg.append($("<span>").addClass("card-title").text(result.recipe.label));

                createCard.append(createCardImg);

                // Shows number of servings
                createCardContent.append($("<p>").addClass("valign-wrapper").attr("id", "serving" + i).text(result.recipe.yield + " servings"));
                // Displays total calorie count
                createCardContent.append($("<p>").addClass("valign-wrapper").attr("id", "totalCalories" + i).text((Math.round(result.recipe.calories) + " total calories")));
                // Calories per serving
                createCardContent.append($("<p>").addClass("valign-wrapper").attr("id", "caloriesPerMeal" + i).text("(" + (Math.round(result.recipe.calories / result.recipe.yield)) + " cal per serving)"));
                // Number of ingredients to use in recipe
                createCardContent.append($("<p>").addClass("valign-wrapper ingredients").attr("id", "ingredients" + i).text(result.recipe.ingredients.length + " ingredients"));

                createCard.append(createCardContent);

                // This should display source of recipe, to be anchored by url
                createCardAction.append($("<a>").attr("href", result.recipe.url).text(result.recipe.source));

                createCard.append(createCardAction);

                containerId.append(createCard);
            };
        });
    };
});