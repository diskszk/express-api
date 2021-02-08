const express = require("express");
const UserModel = require("../models/userModel");
const router = express();

router.post("/", (req, res) => {
  const User = new UserModel();

  // データを詰める
  User.name = req.body.name;
  User.screen_name = req.body.screen_name;
  User.bio = req.body.bio;

  // 保存処理
  User.save((err) => {
    if (err) {
      res.send(err);
      return;
    }
    res.json({ message: "Success!!" });
  });
});

// user全体を取得
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (e) {
    console.error("show users error", e);
  }
});

// user一人を取得
router.get("/:id", async (req, res, next) => {
  const userId = req.params.id;
  const user = await UserModel.findById(userId, (err) => {
    console.error("ERR:", err);
    next(err);
  });
  if (!user) {
    console.error("userが取得できません");

    res.end();
  }
  res.json(user);
});

// 更新
router.put("/:id", async (req, res, next) => {
  const userId = req.params.id;

  const user = await UserModel.findById(userId, (err) => {
    if (err) {
      res.send(err);
      next(err);
    }
  });
  if (!user) {
    console.error("userが取得できません");

    res.end();
  }
  user.name = req.body.name;
  user.screen_name = req.body.screen_name;
  user.bio = req.body.bio;

  await user
    .save()
    .then(() => {
      res.json(user);
    })
    .catch((e) => {
      console.error(e);
    });
});

module.exports = router;
