const axios = require("axios");
const { Router } = require("express");
const router = Router();
const db = require("../config/connection");

router.get("/recipes", (req, res) => {
  const { items } = req.query;
  console.log(items);
  // use items to make query to third party api
  // send back result

  if (items != null) {
    axios
      .request({
        method: "GET",
        url: "https://rapidapi.p.rapidapi.com/recipes/list?q=" + items,
        headers: {
          "x-rapidapi-host": "tasty.p.rapidapi.com",
          "x-rapidapi-key":
            "0a9afa4613msh47a31f8fd322579p11f7cfjsnd2a4eacc7e59",
        },
      })
      .then(function (result) {
        console.log("success");
        res.json(
          result.data.results
            .map(({ name, id }) => {
              return { id, name };
            })
            .filter((recipe) => {
              if (recipe.name) return true;
              console.log(name);
            })
        );
      })
      .catch(function (err) {
        console.error(err);
      });
  } else {
    db.Recipe.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(function (err) {
        console.error(err);
      });
  }
});
router.post("/recipes", (req, res) => {
  const { recipeIds } = req.body;
  Promise.all(
    recipeIds.map((id) =>
      axios
        .request({
          method: "GET",
          url: "https://tasty.p.rapidapi.com/recipes/detail?id=" + id,
          headers: {
            "x-rapidapi-host": "tasty.p.rapidapi.com",
            "x-rapidapi-key":
              "0a9afa4613msh47a31f8fd322579p11f7cfjsnd2a4eacc7e59",
          },
        })
        .then((res) => res.data)
        .catch(() => null)
    )
  )
    .then((recipes) => recipes.filter((recipe) => recipe))
    // .then((recipes) => {
    //   return db.Recipe.bulkCreate(recipes);
    // })
    .then((result) => {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
    });
});
// //tasty API test
// var unirest = require("unirest");

// var req = unirest("GET", "https://rapidapi.p.rapidapi.com/recipes/auto-complete");

// req.query({
//     "prefix": "chicken soup"
// });

// req.headers({
//     "x-rapidapi-host": "tasty.p.rapidapi.com",
//     "x-rapidapi-key": "0a9afa4613msh47a31f8fd322579p11f7cfjsnd2a4eacc7e59",
//     "useQueryString": true
// });

// req.end(function (res) {
//     if (res.error) throw new Error(res.error);

//     console.log(res.body);
// });

// // API test
// var unirest = require("unirest");

// var req = unirest("GET", "https://rapidapi.p.rapidapi.com/search");

// req.query({
//     "q": "beef"
// });

// req.headers({
//     "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
//     "x-rapidapi-key": "0a9afa4613msh47a31f8fd322579p11f7cfjsnd2a4eacc7e59",
//     "useQueryString": true
// });

// req.end(function (res) {
//     if (res.error) throw new Error(res.error);

//     console.log(res.body);
// });

module.exports = router;
