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
    var searchURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityId + "&entity_type=city"
    console.log(searchURL);
    $.ajax({
        url: searchURL,
        method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("user-key", "173297606dd309e858d947e8c0e0562c");
        },
    }).then(function (result) {
        console.log(result);
    })
});
