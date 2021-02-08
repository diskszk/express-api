const express = require("express");
const router = express.Router();
const ArticleModel = require("../models/articleModel");
const moment = require("moment");

router.post("/", (req, res) => {
  const Article = new ArticleModel();

  const date = moment().format("YYYY-MM-DD HH:mm:ss");

  const reqBody = req.body;

  Article.title = reqBody.title;
  Article.text = reqBody.text;
  Article.date = date;

  // 保存
  Article.save()
    .then(() => {
      res.json(Article);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 全取得
router.get("/", async (req, res) => {
  try {
    const articles = await ArticleModel.find();
    res.json(articles);
  } catch (err) {
    res.send(err);
  }
});

// idで取得
router.get("/:id", async (req, res) => {
  const articleId = req.params.id;

  await ArticleModel.findById(articleId, (err, article) => {
    if (err) {
      console.log("not found err");
      res.status(404);
      res.send(err);
      return;
    }

    res.json(article);
  });
});

// DELETE
router.delete("/:id", async (req, res) => {
  const articleId = req.params.id;
  try {
    await ArticleModel.remove({ _id: articleId });
    res.json({ messaga: "Success!" });
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

module.exports = router;
