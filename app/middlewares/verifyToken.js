const jwt = require("jsonwebtoken");
const config = require("../config");

function verifyToken(req, res, next) {
  // const token =
  //   req.body.token || req.query.token || req.headers["x-access-token"];

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token) {
    // jwt認証を行う
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "トークンの認証に失敗しました",
        });
      } else {
        // decodeされた情報をrequestに保存する
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "トークンがありません",
    });
  }
}

module.exports = verifyToken;
