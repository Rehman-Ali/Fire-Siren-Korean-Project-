const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { User, validate } = require("../models/User");


/////////// For Register Admin////////////////

router.post("/signup", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({message:error.details[0].message, success: 0});
  let req_email = req.body.email;
  let email = req_email.toLowerCase();
  let user = await User.findOne({ email: email });
  if (user) return res.status(400).json({message:"User already registered.", success: 0});
  const hash = await bcrypt.hash(req.body.password, 10);
  user = new User(req.body);
  user.email = email;
  user.password = hash;
  user.role = "admin";
  await user.save();
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    config.get("jwtPrivateKey")
  );
  res.status(200).json({
    message: "signup successfull",
    user: user._id,
    token: token,
    success: 1
  });
});

/////////////////////////////////////////////////


///////////// For Login Admin User
router.post("/login", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: "User does not exist" , sucesss : 0});
  const compare = await bcrypt.compare(req.body.password, user.password);
  if (compare) {
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      config.get("jwtPrivateKey")
    );
    res.json({
      message: "login successfull",
      user_id: user._id,
      token: token,
      success: 1
      });
  } else {
    return res.status(400).json({ message: "Invalid Credentials" , success : 0});
  }
});
//////////////////////////////////////








module.exports = router;
