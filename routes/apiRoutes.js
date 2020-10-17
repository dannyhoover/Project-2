const {Router} = require("express");
const router = Router();

const db = require("../config/connection");

router.get("/", (req, res) => {
  res.json("hey, we sent some data from the server");
})

module.exports = router;