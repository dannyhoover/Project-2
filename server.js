var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(express.static("views/images")); 
app.use(require("./routes"));



// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Set Handlebars.
var exphbs = require("express-handlebars");
// const path = require("path");
// app.engine(
//   "exphbs",
//   exphbs({
//     extname: "exphbs",
//     defaultLayout: "base",
//     layoutsDir: path.join(__dirname, "views/layouts"),
//     partialsDir: [
//       //  path to your partials
//       path.join(__dirname, "views/partials"),
//     ],
//   })
// );


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/recipesController");

 app.use(routes);
// app.use("/", require("./routes/htmlRoutes"));
// app.use("/api", require("./routes/apiRoutes"));




// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});


