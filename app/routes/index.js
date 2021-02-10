const express = require("express");
const router = express.Router();

// http://localhost:5000/api/v1 +
router.use("/article", require("./article"));
router.use("/user", require("./user"));
router.use("/sign-up", require("./sign-up"));
router.use("/sign-in", require("./sign-in"));
router.use("/me", require("./me"));

module.exports = router;
