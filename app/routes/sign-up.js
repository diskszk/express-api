const express = require("express");
const router = express.Router();
const AuthenticatedUserModel = require("../models/authenticatedUser");

router.get("/", (req, res) => {
  const AuthenticatedUser = new AuthenticatedUserModel({
    name: "サンプル",
    password: "password",
  });

  AuthenticatedUser.save((err) => {
    if (err) {
      throw new Error(err);
    }
    console.log("ユーザーを作成しました", AuthenticatedUser);
    res.json({ success: true });
  });
});

module.exports = router;
