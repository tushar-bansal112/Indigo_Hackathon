const router = require("express").Router();
const controller = require("../controllers/api.js");

router.use("/api", controller);
module.exports = router;
