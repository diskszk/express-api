const express = require("express");
const router = express.Router();
const AuthenticatedUserModel = require("../models/authenticatedUser");
const VerifyToken = require("../middlewares/verifyToken");

router.get("/", VerifyToken, (req, res) => {
  AuthenticatedUserModel.findOne(
    { name: req.decoded.name },
    { password: 0 },
    (err, user) => {
      if (err) {
        return res.status(500).send("ユーザーの検索に失敗しました");
      }
      if (!user) {
        return res.status(404).send("ユーザーが見つかりません");
      }
      res.status(200).send(user);
    }
  );
});

module.exports = router;
