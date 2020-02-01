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