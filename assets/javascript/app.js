// note to self. items 4 and 6 remain
// #4 When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// #6 Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.

var aTopics = ["funny", "popular", "trending", "fail", "yeet", "jeep", "fat", "haters", "memes", ];
$(document).ready(function () {
//======================================================================
// functions

// display aTopics on the DOM
function onLoad(){
    $("#buttons").empty();
    console.log(aTopics)
    aTopics.forEach(function (topic) {
        var btn = $("<button>");
        btn.text(topic);
        btn.addClass("btn btn-dark m-1 topic")
        btn.attr("data-name", topic);
        $("#buttons").append(btn);
    });
}

// display array of topics as buttons on the DOM
function displayGifs() {
    var gifs = $(this).attr("data-name");
    // console.log("displayGifs" + JSON.stringify($(this)));
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&limit=10"+  "&api_key=FVAZwtJAqZB4l8xC0kg6lkJ1hP8m9NFI";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
            for(var i =0 ; i<res.data.length; i++){
            var newDiv = $("<div class='col-12 col-sm-6 col-md-4 mx-auto'>")
            var newImg = $("<img width='auto' height='200px'>");
            var newP = $("<p>")
            newP.text("Rating: " + res.data[i].rating)
            newImg.attr("src", res.data[i].images.original_still.url).attr("state","still").attr("class","jif").attr("data-animate", res.data[i].images.fixed_height.url).attr("data-still", res.data[i].images.original_still.url);
            newDiv.append(newImg).append(newP);
            $("#results").prepend(newDiv);
        }
    });
}
// user adds a new topic
function newTopic(){
    var sInputValue= $(".form-control").val()
    var sLowerCaseInputValue = sInputValue.toLowerCase();
    if(sLowerCaseInputValue ===""){
        return;
    }else{
    aTopics.push(sLowerCaseInputValue);
    }
}
//=============================================================================================
//main process
onLoad();
//click to display gifs on screen
    $(document).on("click",".topic", displayGifs);

        // When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
    //still or animate toggle click
    $(document).on("click",".jif", function state(){
        var state = $(this).attr("state");        
        if(state==="still"){
            $(this).attr("state","animate");
            $(this).attr("src", $(this).attr("data-animate"));
        } else if(state==="animate"){
            $(this).attr("state", "still");
            $(this).attr("src", $(this).attr("data-still"));
        }
        
    });

    //when user clicks submit run the newTopic function
    $(document).on("click", "#button-addon2", function(){
    event.preventDefault();
    newTopic();
    $(".form-control").val("");
    onLoad();
});
  

})//close document.ready