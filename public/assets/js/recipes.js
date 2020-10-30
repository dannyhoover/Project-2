$.ajax("/api/recipes", {
  type: "POST",
  headers: {
    'Content-Type': "application/json"
  },  
  data: JSON.stringify({recipeIds:["1", "2", "3"]})
})

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".control  .button-search").on("click", function (event) {
    event.preventDefault();
    let searchInput = $(".input").val();
    if (!searchInput) {
      return;
    }
    // Send the PUT request.
    $.ajax("/api/recipes?" + "items=" + searchInput, {
      type: "GET",
    }).then(function (data) {
      $("#search-results").empty().append(...data.slice(0, 3).map(function({name, id}) {
        return $(
          `<div class="column is-4">
            <div class="card is-shady">
              <div class="card-image has-text-centered">
                  <i class="fa fa-paw"></i>
              </div>
              <div class="card-content">
                  <div class="content">
                      <h4>${name}</h4>
                      <p>Easy chicken tacos that only takes 30 minutes. All you need is some chicken, some taco seasoning, some veggies, and your medium for taco goodness.</p>
                      <p><a href="#">Learn more</a></p>
                  </div>
                </div>
              </div>
          </div>`).on("click", () => {
            $.ajax("/api/recipes", {
              type: "POST",
              headers: {
                'Content-Type': "application/json"
              },  
              data: JSON.stringify({recipeIds:[id]})
            }).then(res => {
              console.log(res);
            });
          });
      }));
      // Reload the page to get the updated list
      //location.reload();
    }).catch(function(err) {
      console.error(err);
    });
  });
});
// Do this for the path to saved recipes

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".change-status").on("click", function (event) {
    var id = $(this).data("id");
    var newStatus = $(this).data("newstatus");

    var newSaveState = {
      saved: newStatus,
    };

    // Send the PUT request.
    $.ajax("/api/recipes?" + "items=" + "chicken", {
      type: "PUT",
      data: newSaveState,
    }).then(function () {
      console.log("changed status to", newStatus);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newRecipe = {
      name: $("#ca").val().trim(),
      saved: $("[name=saved]:checked").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/recipes", {
      type: "POST",
      data: newRecipe,
    }).then(function () {
      console.log("created new recipe");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".delete-recipe").on("click", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/recipes/" + id, {
      type: "DELETE",
    }).then(function () {
      console.log("deleted recipe", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});

// const searchForm = $("#recipe-search-form");


// async function searchForRecipeData(recipe) {
//     try {
//         const responses = await Promise.all([
//             // example fetch until api is setup
//             fetch(`https://cors-anywhere.herokuapp.com/http://api.isportsapi.com/sport/basketball/team/search?api_key=${apiKey5}&name=${city}`)
//         ]);
//         const [recipeSearchResults] = await Promise.all(responses.map(response => response.json()));
//         searchForm.addClass("hide");
//         console.log(recipeSearchResults);
//         recipes = recipeSearchResults.data.map(function (recipeData) {
//             // Filter object properties
//             return { ...recipeData };
//         });
//         displayRecipeSelection();
//         // error checks
//     } catch (error) {
//         console.error(error);
//     }
// }

