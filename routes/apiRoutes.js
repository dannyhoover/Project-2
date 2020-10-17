const {Router} = require("express");
const router = Router();

const db = require("../config/connection");

router.get("/", (req, res) => {
  res.json("hey, we sent some data from the server");
})

// tasty API test
var unirest = require("unirest");

var req = unirest("GET", "https://rapidapi.p.rapidapi.com/recipes/auto-complete");

req.query({
    "prefix": "chicken soup"
});

req.headers({
    "x-rapidapi-host": "tasty.p.rapidapi.com",
    "x-rapidapi-key": "0a9afa4613msh47a31f8fd322579p11f7cfjsnd2a4eacc7e59",
    "useQueryString": true
});


req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
});

// // API test
// var unirest = require("unirest");

// var req = unirest("GET", "https://rapidapi.p.rapidapi.com/search");

// req.query({
//     "q": "chicken"
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