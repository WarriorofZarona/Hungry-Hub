//Recipe Search, sample chicken
var keyWord = "chicken" //location of user input for recipe

var queryURL = "https://api.edamam.com/search?app_id=2d10e9e9&app_key=041becfbb0cfe254d9b264eb2339c614&q=" + keyWord;

$.ajax({

    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)

    var recipe =

        $.each(response.hits, function (i, result) {

            console.log("Recipe # " + i)
            console.log("The recipe name is " + result.recipe.label)

            // This should display recipe image, to be used in img src
            console.log("Image source is " + result.recipe.image)

            // This should display source of recipe, to be anchored by url
            console.log("Source is " + result.recipe.source + " and url is " + response.hits[0].recipe.url)

            // DIsplays calorie count
            console.log("Calories are " + Math.round(result.recipe.calories))

            console.log("Number of ingredients: " + result.recipe.ingredients.length)


        })
    // Use response.hits[0], using for loop to go through each result

    // This should display recipe name
    console.log("The recipe name is " + response.hits[0].recipe.label)

    // This should display recipe image, to be used in img src
    console.log("Image source is " + response.hits[0].recipe.image)

    // This should display source of recipe, to be anchored by url
    console.log("Source is " + response.hits[0].recipe.source + " and url is " + response.hits[0].recipe.url)

    // DIsplays calorie count
    console.log("Calories are " + Math.round(response.hits[0].recipe.calories))

    console.log("Number of ingredients: " + response.hits[0].recipe.ingredients.length)
})


// Zomato API url wth the user key as a header. this sends the user key as a parameter.

var queryURL = "https://developers.zomato.com/api/v2.1/search?";

$.ajax({
    url: queryURL,
    method: "GET",
    beforeSend: function (request) {
        request.setRequestHeader("user-key", "173297606dd309e858d947e8c0e0562c");
    },
}).then(function (response) {
    console.log(response);
});

var city = "280";

console.log(queryURL)
