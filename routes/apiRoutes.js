const axios = require("axios");
const { Router } = require("express");
const router = Router();
const db = require("../config/connection");


router.get("/recipe", (req, res) => {
  const { items } = req.query;
  console.log(items);
  // use items to make query to third party api
  // send back result

  const options = {
    method: "GET",
    url: "https://rapidapi.p.rapidapi.com/recipes/list/items=" + beef,
    headers: {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": "0a9afa4613msh47a31f8fd322579p11f7cfjsnd2a4eacc7e59",
    },

  };

    axios.request(options).then(function (result) {
      console.log("success");
      res.json(
        result.data.results
          .map(({ name }) => {
            return { name };
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
});

module.exports = router;

router.get("/recipes", (req, res) => {
  const { items } = req.query;
  console.log(items);
  // use items to make query to third party api
  // send back result

  axios({
    method: "GET",
    url: "https://rapidapi.p.rapidapi.com/recipes/list",
    params: { q: items },
    headers: {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": "0a9afa4613msh47a31f8fd322579p11f7cfjsnd2a4eacc7e59",
    },
  })
    .then(function (result) {
      console.log("success");
      res.json(
        result.data.results
          .map(({ name }) => {
            return { name };
          })
          .filter((recipe) => {
            if (/beef/gi.test(recipe.name)) return true;
          })
      );
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
