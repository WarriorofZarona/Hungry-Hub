//Recipe Search, sample chicken
var keyWord = "chicken" //location of user input for recipe

var queryURL = "https://api.edamam.com/search?app_id=2d10e9e9&app_key=041becfbb0cfe254d9b264eb2339c614&to=12&q=" + keyWord;




$.ajax({

    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)

    // $.each(response.hits, function (i, result) {

    // console.log("Recipe #" + parseInt(i + 1))
    // console.log("The recipe name is " + result.recipe.label)
    // $("#recipe0").text(result.recipe.label)
    // // This should display recipe image, to be used in img src
    // // console.log("Image source is " + result.recipe.image)
    // $("#image0").attr("src", result.recipe.image)
    // // This should display source of recipe, to be anchored by url
    // // console.log("Source is " + result.recipe.source + " and url is " + result.recipe.url)
    // $("#link0").attr("href", result.recipe.url).text(result.recipe.source)
    // // DIsplays calorie count
    // // console.log("Calories are " + Math.round(result.recipe.calories))
    // $("#results0").append($("<span>").attr("id", "calorie0").text(Math.round(result.recipe.calories) + " calories"))
    // // console.log("Number of ingredients: " + result.recipe.ingredients.length)
    // $("#results0").append($("<span>").attr("id", "ingredients0").text(result.recipe.ingredients.length + " ingredients"))



    // })
    // Create card div

    for (var i = 0; i < response.hits.length; i++) {
        var createCardContainer = $("<div>").addClass("col s12 l2").attr("id", "card" + i);
        $("#results").append(createCardContainer);
        var containerId = $("#card" + i);
        var createCard = $("<div>").addClass("card small");
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
        // DIsplays calorie count
        // console.log("Calories are " + Math.round(response.hits[0].recipe.calories))

        createCardContent.append($("<p>").addClass("valign-wrapper").attr("id", "calorie" + i).text(Math.round(result.recipe.calories) + " cal"))
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

// Notes: Need to add ID's for Card Title (recipe0), Image (image0), Link insert (link0), and Card Content (result0)