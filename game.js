// Array of movies - 16
var superheroes = ["Black Panther", "Thor", "Iron Man", "Spider-Man", "War Machine", "Rocket Raccoon", "Groot", 
"Peter Quill", "Black Widow", "Killmonger", "Loki", "Gamora", "Drax the Destroyer", "Captain America", "Hawkeye", 
"Hulk", ] 

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

          for (var i = 0; i < results.length; i++) {
            var heroesDiv = $("<div class='heroes'>");
            var pOne = $("<p>").text("Rating: " + results[i].rating);
            heroesDiv.append(pOne);
            var pTwo = $("<img>").attr({ // "src":results[i].images.fixed_height.url, 
            "src":results[i].images.fixed_height_still.url, 
            "data-animate":results[i].images.fixed_height.url, "data-state":"still", "class":"gif", });
            heroesDiv.append(pTwo);
            $("#gifs-appear-here").prepend(heroesDiv);
    //        console.log(pTwo);
          };

          $(".gif").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("src"));
              $(this).attr("data-state", "still");
              console.log(this)
            }
          });

        

        });

  };

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

  $("#run-search").on("click", function(event) {
    event.preventDefault();
    var hero = $("#search").val().trim();

    superheroes.push(hero);
    renderButtons();
  });

  $(document).on("click", ".heroes-btn", displayImages);

  renderButtons();

  // Add function to check if the added hero is already in the array
  // if yes, do not add him again. If no - proceed as normal

  // create attributes data-still, data-animate and create a function to pull both animated and still images



          

        
