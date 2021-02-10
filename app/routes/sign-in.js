const express = require("express");
const router = express.Router();
const AuthenticatedUserModel = require("../models/authenticatedUser");
const jwt = require("jsonwebtoken");

const config = require("../config");
const app = express();
app.set("secretKey", config.secret);

router.post("/", (req, res) => {
  // リクエストパラメーターから名前を取り出して検索する
  AuthenticatedUserModel.findOne(
    {
      name: req.body.name,
    },
    (err, user) => {
      if (err) {
        throw new Error(err);
      }
      console.log("user", user);
      if (user) {
        // パスワードが正しいことを確認
        if (user.password !== req.body.password) {
          res.json({ success: false, message: "パスワードが違います" });
        } else {
          // ユーザとパスワードの組が正しければトークンを発行する
          const payload = {
            name: user.name,
          };
          const token = jwt.sign(payload, app.get("secretKey"));

          // tokenを返す
          res.json({
            success: true,
            token: token,
          });
          
        }
      } else {
        res.json({ success: false, message: "ユーザーがいません" });
      }
    }
  );
});

module.exports = router;
