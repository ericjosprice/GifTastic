// Api Key:
// FVAZwtJAqZB4l8xC0kg6lkJ1hP8m9NFI

var aTopics = ["fail", "yeet", "Jeep", "fat", "haters", "memes", ];
$(document).ready(function () {
//======================================================================

aTopics.forEach(function (topic) {
    var btn = $("<button>");
    btn.text(topic);
    btn.addClass("btn btn-dark m-1 jif")
    btn.attr("data-name", topic);
    $("#buttons").append(btn);
});


////////////////////////////////////////////////////////////////////////
// functions

function displayGifs() {
    var gifs = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&limit=10"+ "&api_key=FVAZwtJAqZB4l8xC0kg6lkJ1hP8m9NFI";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
            console.log(res);
            console.log(res.data[0].images.original_still.url);

            for(var i =0 ; i<res.data.length; i++){
            var newDiv = $("<div>")
            var newImg = $("<img>");
            var newP = $("<p>")
            newP.text("Rating: " + res.data[i].rating)
            newImg.attr("src", res.data[i].images.original_still.url);
            newDiv.append(newImg).append(newP);
            $("#results").prepend(newDiv);
        }
        });

}

    /////////////////////////////////////////////////////////////////////////
    // When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

    $(document).on("click",".jif", displayGifs);
    var value = $(this).val();

})//close document.ready