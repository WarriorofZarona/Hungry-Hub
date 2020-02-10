//Recipe Search, sample chicken

$(document).ready(function () {
    // Defining starting Index when API starts 
    var currentIndex = 0;
    // Starts the initial AJAX call when a keyword is typed in, and then presses the enter key
    $("#search-input").on("keypress", function (event) {
        if (event.which == 13) {
            event.preventDefault();
            loadResults(currentIndex);
        }
    })

    // Controls the navigation and active state of page numbers and search results
    $(".navigate").click(function () {

        if ($(this).attr("data-page") === "next") {
            if (currentIndex === 4) {
                currentIndex = 4;
                loadResults(currentIndex);
            } else {
                currentIndex = currentIndex + 1;
                loadResults(currentIndex);
                $(".navigate").removeClass("active orange");
                activeNav();
            }
        } else if ($(this).attr("data-page") === "prev") {
            if (currentIndex === 0) {
                currentIndex = 0
                loadResults(currentIndex)
            } else {
                currentIndex = currentIndex - 1;
                loadResults(currentIndex)
                if ($('.navigate').hasClass('active orange')) {
                    $('.navigate').removeClass('active orange');
                }
                activeNav();
                if ($(this).hasClass("disabled")) {
                    $(this).removeClass("disabled");
                    $(this).addClass("waves-effect");
                }
            }
        } else {
            currentIndex = parseInt($(this).attr("data-page") - 1);
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
                $("#prev").addClass("disabled");
                $("#next").removeClass("disabled");
            } else if ($("#page5").hasClass("active orange")) {
                $("#next").addClass("disabled");
                $("#prev").removeClass("disabled");
            } else {
                $(".navigate").removeClass("disabled");
            }

        }
        function activeNav() {
            for (var i = 0; i < 5; i++) {
                if (currentIndex == i) {
                    $("#page" + (currentIndex + 1)).addClass("active orange");
                }
            }
        }
    })

    // $(".optional").click(function (event) {
    //     console.log("I'm being clicked on yay!")

    //     event.stopPropagation();
    //     event.preventDefault();

    // })

    function loadResults(index) {
        // Clears the results
        $("#results").empty();

        var keyWord = $("#search-input").val() //location of user input for recipe

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

        var queryURL = "https://api.edamam.com/search?app_id=2d10e9e9&app_key=041becfbb0cfe254d9b264eb2339c614&from=" + pages[index].from + "&to=" + pages[index].to + "&q=" + keyWord;
        $.ajax({

            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL)
            console.log(response)

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

                var result = response.hits[i]

                // This should display recipe image, to be used in img src
                createCardImg.append($("<img>").addClass("responsive-img").attr("src", result.recipe.image))
                // This should display recipe name
                createCardImg.append($("<span>").addClass("card-title").text(result.recipe.label))

                createCard.append(createCardImg);

                // Shows number of servings
                createCardContent.append($("<p>").addClass("valign-wrapper").attr("id", "serving" + i).text(result.recipe.yield + " servings"))
                // Displays total calorie count
                createCardContent.append($("<p>").addClass("valign-wrapper").attr("id", "totalCalories" + i).text((Math.round(result.recipe.calories) + " total calories")))
                // Calories per serving
                createCardContent.append($("<p>").addClass("valign-wrapper").attr("id", "caloriesPerMeal" + i).text("(" + (Math.round(result.recipe.calories / result.recipe.yield)) + " cal per serving)"))
                // Number of ingredients to use in recipe
                createCardContent.append($("<p>").addClass("valign-wrapper ingredients").attr("id", "ingredients" + i).text(result.recipe.ingredients.length + " ingredients"))

                createCard.append(createCardContent);

                // This should display source of recipe, to be anchored by url
                createCardAction.append($("<a>").attr("href", result.recipe.url).text(result.recipe.source));

                createCard.append(createCardAction);

                containerId.append(createCard);
            }
        })
    }
})
// Notes: Need to add ID's for Card Title (recipe0), Image (image0), Link insert (link0), and Card Content (result0)