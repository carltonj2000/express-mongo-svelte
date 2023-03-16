var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

const { ObjectId } = require("mongodb");
const dbConn = require("../dbConn");
const dotenv = require("dotenv");
dotenv.config();

const findUserById = async (collection, userId) => {
  const User = await collection.find({ _id: new ObjectId(userId) }).toArray();
  return User[0];
};

router.get("/", async function(req, res) {
  res.header("Access-Control-Allow-Origin", ["http://localhost:5173"]);
  res.header("Access-Control-Allow-Credentials", "true");

  const cookie = req.cookies["token"];
  if (!cookie)
    return res.status(404).json({
      success: false,
      error: true,
      message: "Cookie Missing",
    });

  try {
    const claims = jwt.verify(cookie, process.env.SECRET);
    if (!claims)
      return res.status(404).json({
        success: false,
        error: true,
        message: "Not Authorized",
      });
    else {
      const user = await findUserById(dbConn.Coll, claims._id);
      delete user.password;
      return res.json({
        success: true,
        error: false,
        message: "Authorized",
        data: user,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "JWT Error",
    });
  }
});

module.exports = router;
