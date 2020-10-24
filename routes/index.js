const {Router} = require("express");
const router = Router();


router.use("/", require("./htmlRoutes"));
router.use("/api", require("./apiRoutes"));

module.exports = router;