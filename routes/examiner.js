const express = require("express");
const router = express.Router();
const { Operator } = require("../models/Operator");
const { Examiner, validate } = require("../models/Examiner");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


/////////// For register Examiner ///////////////
router.post("/register", async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: 0 });

  let operator = await Operator.findOne({ _id: req.body.operator_id });
  if (!operator) return res.status(400).json({ message: "Operator code in invalid!", success: 0 });

  let req_email = req.body.email;
  let email = req_email.toLowerCase();
  let user = await Examiner.findOne({ email: email });
  if (user) return res.status(400).json({ message: "User with this email already registered.", success: 0 });
  const hash = await bcrypt.hash(req.body.password, 10);
  user = new Examiner(req.body);
  user.email = email;
  user.password = hash;
  user.role = "examiner";
  user.status = "pending";
  await user.save();
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    config.get("jwtPrivateKey")
  );
  res.status(200).json({
    message: "signup successfull",
    examiner_id: user._id,
    token: token,
    role: user.role,
    success: 1
  });

});
/////////////////////////////////////////////////////////




/////////// For Get Examiner of all organization of specific Operator ///////////////

router.get("/list", auth, async (req, res) => {
  try {

    // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

    let findOperator = await Operator.find({ _id: req.user._id });
    if (findOperator.length < 1) return res.status(400).json({ message: "No data exist against your ID!", success: 0 });

    await Examiner.find().select('-password').populate({ path: 'operator_id', select: ["first_name","last_name", "address", "phone"] }).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data.length > 0) {
          let arr = [];
          console.log("data", data)
          for (i = 0; i < findOperator.length; i++) {
            let copyArr = data
            let filterArr = copyArr.filter((item => item.operator_id._id.toString() == findOperator[i]._id.toString()))
            arr.push(...filterArr)
          }

          res.status(200).json({ message: 'Examiner get succesfully', success: 1, data: arr })
        }else{
          res.status(200).json({ message: 'No Examiner exist', success: 1, data: [] })

        }
      });
  } catch {
    res.status(500).json({
      data: [],
      message: "Server Internal Error.",
      success: 0,
    });
  }
});
/////////////////////////////////////////////////////////



/////////// For Get Single Exanimar  ///////////////
router.get("/:id", auth, async (req, res) => {
  try {

    await Examiner.findOne({_id: req.params.id}).select('-password').populate({ path: 'operator_id', select: ['first_name', "last_name", "address", "phone"] }).
    exec(function (err, data) {
      if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
      if (data) { 
        res.status(200).json({ message: 'Examiner data get successfully', success: 1, data: data })
      }else{
        res.status(200).json({ message: 'No Examiner exist', success: 1, data: {} })
      }
    })
  } catch {
    res.status(500).json({
      data: [],
      message: "Server Internal Error.",
      success: 0,
    });
  }
});
/////////////////////////////////////////////////////////




///////////// Update the Operator Info (status and other) /////////////////



router.put("/:id", auth, async (req, res) => {
  try {

    // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

    let examiner = await Examiner.findOne({ _id: req.params.id });

    if (!examiner) {
      return res.json({ message: "No examiner found with this ID", success: 0 });
    }
    if (JSON.stringify(req.body) === '{}') {
      return res.status(200).json({
        message: "No field provide",
        success: 0
      });
    }

    await Examiner.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });

    res.status(200).json({
      message: "Examiner has been updated successfully",
      success: 1
    });

  } catch {
    res.status(500).json({
      data: [],
      message: "Server Internal Error.",
      success: 0,
    });
  }
});
////////////////



//////// For Delete Examiner ///////////////////////

router.delete("/:id", auth, async (req, res) => {
  // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });


  let examiner = await Examiner.findOne({ _id: req.params.id });
  if (!examiner)
    return res.status(400).json({ message: "No examiner with this id exists.", success: 0 });

  await Examiner.deleteOne({ _id: req.params.id });

  res.status(200).json({
    message: "Examiner has been deleted Successfully",
    success: 1
  });
});

//////////////////////////////////////////////////////////







module.exports = router;
