var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
const dbConn = require("../dbConn");

const registerUser = async (collection, user) => {
  const register = await collection.insertOne(user);
  await collection.createIndex({ username: 1 }, { unique: true });
  return register;
};

router.post("/", async function(req, res, next) {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", ["http://localhost:5173"]);
  if (!req.body.username) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Missing username",
      data: req.body,
    });
  }
  if (!req.body.password) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Missing password",
      data: req.body,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: hashedPassword,
  };

  try {
    const newRegister = await registerUser(dbConn.Coll, newUser);
    return res.json({
      success: true,
      error: false,
      message: "Successful Registration!",
      data: newRegister,
    });
  } catch (e) {
    console.log("Registartion failed", e);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Unsuccessful Registration!",
      data: newRegister,
    });
  }
});

module.exports = router;
