var express = require("express");
var router = express.Router();

router.post("/", function(req, res) {
  res.header("Access-Control-Allow-Origin", ["http://localhost:5173"]);
  res.header("Access-Control-Allow-Credentials", "true");
  res.cookie("token", { httpOnly: true, maxAge: 0 });
  res.json({ success: true, error: false, message: "Logout Success" });
});

module.exports = router;
