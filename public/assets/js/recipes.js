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

// Make sure we wait to attach our handlers until the DOM is fully loaded.


// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  console.log("test1");
  $(".control  .button-search").on("click", function (event) {
    event.preventDefault();
    console.log("button worked");
    let searchInput = $(".input").val();
    console.log(searchInput);
    // Send the PUT request.
    $.ajax("/api/recipes?" + "items=" + searchInput, {
      type: "GET",
    }).then(function () {
      console.log("ajax working");
      // Reload the page to get the updated list
      //location.reload();
    });
  });
});
    
    
        // $(".create-form").on("submit", function (event) {
        //     // Make sure to preventDefault on a submit event.
        //     event.preventDefault();
    
        //     var newRecipe = {
        //         name: $("#ca").val().trim(),
        //         saved: $("[name=saved]:checked").val().trim()
        //     };
    
        //     // Send the POST request.
        //     $.ajax("/api/recipes", {
        //         type: "POST",
        //         data: newRecipe
        //     }).then(
        //         function () {
        //             console.log("created new recipe");
        //             // Reload the page to get the updated list
        //             location.reload();
        //         }
        //     );
        // });
    
        // $(".delete-recipe").on("click", function (event) {
        //     var id = $(this).data("id");
    
        //     // Send the DELETE request.
        //     $.ajax("/api/recipes/" + id, {
        //         type: "DELETE"
        //     }).then(
        //         function () {
        //             console.log("deleted recipe", id);
        //             // Reload the page to get the updated list
        //             location.reload();
        //         }
        //     );
        // });
    
