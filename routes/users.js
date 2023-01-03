const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { User, validate } = require("../models/User");

router.patch("/user-edit", auth, async (req, res) => {
  const user_id = req.user._id;
  let user = await User.findOne({ _id: user_id });
  if (!user) return res.json({ message: "User Does Not Exists" });
  user = await User.updateOne(
    { _id: user_id },
    { $set: { mobile_token: req.body.mobile_token } },
    { new: true }
  );
  return res.json({ message: "Mobile token added successfully" });
});

router.post("/signup", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({msg:error.details[0].message});
  let req_email = req.body.email;
  let email = req_email.toLowerCase();
  let user = await User.findOne({ email: email });
  if (user) return res.status(400).json({msg:"User already registered."});
  const hash = await bcrypt.hash(req.body.password, 10);
  user = new User(req.body);
  user.email = email;
  user.password = hash;
  //user.roles = "Director";
  user.roles = "CEO";
  await user.save();
  const token = jwt.sign(
    { _id: user._id, roles: user.roles },
    config.get("jwtPrivateKey")
  );
  //res.send(token);
  res.json({
    message: "signup successfull",
    user: user._id,
    token: token,
  });
});

router.patch("/profile", auth, async (req, res) => {
  let user_id = req.user._id;
  let users = await User.findByIdAndUpdate(
    { _id: user_id },
    {
      $set: {
        cnic: req.body.cnic,
        phone: req.body.phone,
        name: req.body.name,
        email: req.body.email,
      },
    },
    { new: true }
  );

  return res.json({
    email: users.email,
    cnic: users.cnic,
    phone: users.phone,
    name: users.name,
  });
});

router.post("/login", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  console.log(req.body);
  if (!user) return res.status(404).json({ message: "User does not exist" });
  //const hash = await bcrypt.hash(req.body.password, 10);
  const compare = await bcrypt.compare(req.body.password, user.password);
  console.log(compare);
  if (compare) {
    const token = jwt.sign(
      { _id: user._id, roles: user.roles },
      config.get("jwtPrivateKey")
    );
    res.json({
      message: "login successfull",
      user_id: user._id,
      name: user.name,
      token: token,
      email: user.email,
      roles: user.roles,
      cnic: user.cnic,
      phone: user.phone,
    });
  } else {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
});

module.exports = router;
