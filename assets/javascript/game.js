// Array of heroes - 16
var superheroes = ["Black Panther", "Thor", "Iron Man", "Spider-Man", "War Machine", "Rocket Raccoon", "Groot", 
"Peter Quill", "Black Widow", "Killmonger", "Loki", "Gamora", "Drax the Destroyer", "Captain America", "Hawkeye", 
"Hulk", ]; 

// AJAX function 
function displayImages() {
  var hero = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      hero + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response)
          var results = response.data;

            // Display gifs and ratings on the page 
            for (var i = 0; i < results.length; i++) {
              var heroesDiv = $("<div class='heroes'>");

                // Rating:
                var pOne = $("<p>").text("Rating: " + results[i].rating);
                  heroesDiv.append(pOne);

                // Image:
                var pTwo = $("<img>").attr({ "src":results[i].images.fixed_height_still.url, 
                    "data-still":results[i].images.fixed_height_still.url, 
                    "data-animate":results[i].images.fixed_height.url, 
                    "data-state":"still", 
                    "class":"gif", });
                  heroesDiv.append(pTwo);
            
                  $("#gifs-appear-here").prepend(heroesDiv);

            };

            // Click on gif to make it move/stop moving. 
            // For some reason sometimes it requires two clicks in order for it to start/stop moving.
            // I'm not sure why it's happening. Could it be because it needs time to load from giphy?
            $(".gif").on("click", function() {
            var state = $(this).attr("data-state");

              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            };
          
            });

        });

};

// Function to create buttons from an array 
function renderButtons() {
    $("#buttons-appear-here").empty();

      for (var i = 0; i < superheroes.length; i++) {
        var createButton = $("<button>");
          createButton.addClass("heroes-btn");
          createButton.attr("data-name", superheroes[i]);
          createButton.text(superheroes[i]);

        $("#buttons-appear-here").append(createButton);
     
      };

};

// Function to run the search, add the user input into the array, and create a button.
// Check if user input matches items in array. If yes - do not add it and clear the search.
// If no - add a button and clear the search.  
$("#run-search").on("click", function(event) {
    event.preventDefault();
    var hero = $("#search").val().trim();

  if (superheroes.indexOf(hero) > -1) {
    $("#search").val("");
               
  } else if (superheroes.indexOf(hero) === -1) {
      superheroes.push(hero);
      renderButtons();
      $("#search").val("");

  };

});

// Click event to display gifs
$(document).on("click", ".heroes-btn", displayImages);

// Calling the function to create buttons 
renderButtons();




          

        
