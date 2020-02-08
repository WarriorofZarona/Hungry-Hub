//Recipe Search, sample chicken

$(document).ready(function () {


    var currentIndex = 0;
    var keyWord = "chicken" //location of user input for recipe

    loadResults(0)

    $("li").click(function () {

        if ($(this).attr("data-page") === "next") {
            console.log($(this).attr("data-page"))
            if (currentIndex === 4) {
                currentIndex = 4;
                loadResults(currentIndex);
            } else {
                currentIndex = currentIndex + 1;
                console.log(currentIndex);
                loadResults(currentIndex);
            }
        } else if ($(this).attr("data-page") === "prev") {
            console.log($(this).attr("data-page"))
            console.log(currentIndex);
            if (currentIndex === 0) {
                currentIndex = 0
                console.log(currentIndex)
                loadResults(currentIndex)
            } else {
                currentIndex = currentIndex - 1;
                console.log(currentIndex)
                loadResults(currentIndex)
            }

        } else {
            console.log($(this).attr("data-page"))
            currentIndex = parseInt($(this).attr("data-page") - 1);
            console.log(currentIndex);
            loadResults(currentIndex);

        }
    })


    function loadResults(index) {
        $("#results").empty();

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
            to: 52
        },
        {
            page: 5,
            from: 53,
            to: 65
        }];

        console.log(pages)


        var queryURL = "https://api.edamam.com/search?app_id=2d10e9e9&app_key=041becfbb0cfe254d9b264eb2339c614&from=" + pages[index].from + "&to=" + pages[index].to + "&q=" + keyWord;
        $.ajax({

            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL)
            console.log(response)

            for (var i = 0; i < response.hits.length; i++) {
                var createCardContainer = $("<div>").addClass("col s12 l2").attr("id", "card" + i);
                $("#results").append(createCardContainer);
                var containerId = $("#card" + i);
                var createCard = $("<div>").addClass("card medium");
                var createCardImg = $("<div>").addClass("card-image");
                var createCardContent = $("<div>").addClass("card-content");
                var createCardAction = $("<div>").addClass("card-action");
                // Use response.hits[0], using for loop to go through each result


                var result = response.hits[i]

                // This should display recipe image, to be used in img src
                // console.log("Image source is " + response.hits[0].recipe.image)
                createCardImg.append($("<img>").addClass("responsive-img").attr("src", result.recipe.image))
                // This should display recipe name
                // console.log("The recipe name is " + response.hits[0].recipe.label)
                createCardImg.append($("<span>").addClass("card-title").text(result.recipe.label))

                createCard.append(createCardImg);

                // Shows number of servings
                createCardContent.append($("<p>").addClass("valign-wrapper").attr("id", "serving" + i).text(result.recipe.yield + " servings"))
                // Displays total calorie count
                // console.log("Calories are " + Math.round(response.hits[0].recipe.calories))

                createCardContent.append($("<p>").addClass("valign-wrapper").attr("id", "totalCalories" + i).text((Math.round(result.recipe.calories) + " total calories")))
                // Calories per serving
                createCardContent.append($("<p>").addClass("valign-wrapper").attr("id", "caloriesPerMeal" + i).text("(" + (Math.round(result.recipe.calories / result.recipe.yield)) + " cal per serving)"))
                // console.log("Number of ingredients: " + response.hits[0].recipe.ingredients.length)
                createCardContent.append($("<p>").addClass("valign-wrapper ingredients").attr("id", "ingredients" + i).text(result.recipe.ingredients.length + " ingredients"))

                createCard.append(createCardContent);
                // This should display source of recipe, to be anchored by url
                // console.log("Source is " + response.hits[0].recipe.source + " and url is " + response.hits[0].recipe.url)
                createCardAction.append($("<a>").attr("href", result.recipe.url).text(result.recipe.source));

                createCard.append(createCardAction);

                containerId.append(createCard);
            }
        })
    }
})

// Notes: Need to add ID's for Card Title (recipe0), Image (image0), Link insert (link0), and Card Content (result0)