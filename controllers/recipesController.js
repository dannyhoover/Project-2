var express = require("express");

var router = express.Router();

// Import the model (recipe.js) to use its database functions.
var recipe = require("../models/recipe.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    recipe.all(function (data) {
        var hbsObject = {
            recipes: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/recipes", function (req, res) {
    recipe.create([
        "name", "saved"
    ], [
        req.body.name, req.body.saved
    ], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.put("/api/recipes/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    recipe.update({
        saved: req.body.saved
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/recipes/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    recipe.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
// module.exports = router;
