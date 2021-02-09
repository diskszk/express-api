const express = require("express");
const router = express.Router();

// http://localhost:5000/api/v1 +
router.use("/article", require("./article"));
router.use("/user", require("./user"));
router.use("/health-check", require("./healthCheck"));
router.use("/signup", require("./signUp"));
router.use("/login", require("./login"));
router.use("/me", require("./me"));

module.exports = router;
