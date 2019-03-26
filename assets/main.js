$(document).ready(function() {
    var topics = ["Hip Hop", "Basketball", "Movies"];

    $(".submit").on("click", function() {
        event.preventDefault();
        console.log("submit");
        var buttonDiv = $("#buttons");
        var newTopic = $("#topic-input").val();
        buttonDiv.append("<button class='btn btn-success' value='" + newTopic + "'>" + newTopic + "</button>");
        topics.push(newTopic);
    });
    
    function getButtons () {
        $("#buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var buttonDiv = $("#buttons");
            buttonDiv.append("<button class='btn btn-success' value='" + topics[i] + "'>" + topics[i] + "</button>");
        }
        
    }


    getButtons();

    


    $("#buttons").on("click", ".btn", function() {
        var searchTerm = $(this).attr("value");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=1Os4lFi1IlOlhtLVMfBXusow7m7jkXhs&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            var results = response.data;
            console.log(results);
            $("#gifs").empty();
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                var searchGif = $("<img>");
                var gifAttributes = searchGif.attr("src", results[i].images.fixed_height.url).attr("class", "gif").attr("data-still", results[i].images.original_still.url).attr("data-state", "still").attr("data-animate", results[i].images.original.url);
                gifDiv.prepend(p);
                gifDiv.prepend(gifAttributes);
                $("#gifs").prepend(gifDiv);
            }
        })
    })


    function newState () {
        var state = $(this).attr("data-state");
        var still = $(this).attr("data-still");
        var animate = $(this).attr("data-animate");

        if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    }

    
    $(document).on("click", ".gif", newState);
})