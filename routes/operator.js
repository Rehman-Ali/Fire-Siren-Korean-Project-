const express = require("express");
const router = express.Router();
const { Organization } = require("../models/Organization");
const { Operator, validate } = require("../models/Operator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


/////////// For register Operator ///////////////
router.post("/register", async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: 0 });

  let findOrganization = await Organization.findOne({ _id: req.body.organization_id });
  if (!findOrganization) return res.status(400).json({ message: "Organization not exist!", success: 0 });

  let req_email = req.body.email;
  let email = req_email.toLowerCase();
  let user = await Operator.findOne({ email: email });
  if (user) return res.status(400).json({ message: "User with this email already registered.", success: 0 });
  const hash = await bcrypt.hash(req.body.password, 10);
  user = new Operator(req.body);
  user.email = email;
  user.password = hash;
  user.role = "operator";
  user.status = "pending";
  await user.save();
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    config.get("jwtPrivateKey")
  );
  res.status(200).json({
    message: "signup successfull",
    operator_id: user._id,
    token: token,
    role: user.role,
    success: 1
  });

});
/////////////////////////////////////////////////////////




/////////// For Get Operator of all organization of specific Admin ///////////////

router.get("/list", auth, async (req, res) => {
  try {

    if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

    let findOrganization = await Organization.find({ administrator_id: req.user._id });
    if (findOrganization.length < 1) return res.status(400).json({ message: "No operator and organization exist!", success: 0 });

    await Operator.find().select('-password').populate({ path: 'organization_id', select: ['organization_name', "address", "phone"] }).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data.length > 0) {
          let arr = [];
          console.log("data", data)
          for (i = 0; i < findOrganization.length; i++) {
            let copyArr = data
            let filterArr = copyArr.filter((item => item.organization_id._id.toString() == findOrganization[i]._id.toString()))
            arr.push(...filterArr)
          }

          res.status(200).json({ message: 'Oprator get succesfully', success: 1, data: arr })
        }else{
          res.status(200).json({ message: 'No Oprator exist', success: 1, data: [] })

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



/////////// For Get Operator of all organization of specific Admin ///////////////
router.get("/:id", auth, async (req, res) => {
  try {
    
    await Operator.findOne({_id: req.params.id}).select('-password').populate({ path: 'organization_id', select: ['organization_name', "address", "phone"] }).
    exec(function (err, data) {
      if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
      if (data) { 
        res.status(200).json({ message: 'Operator data get successfully', success: 1, data: data })
      }else{
        res.status(200).json({ message: 'No Oprator exist', success: 1, data: {} })
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

    let operator = await Operator.findOne({ _id: req.params.id });

    if (!operator) {
      return res.json({ message: "No Operator found with this ID", success: 0 });
    }
    if (JSON.stringify(req.body) === '{}') {
      return res.status(200).json({
        message: "No field provide",
        success: 0
      });
    }

    await Operator.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });

    res.status(200).json({
      message: "Operator has been updated successfully",
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



//////// For Delete Operator ///////////////////////

router.delete("/:id", auth, async (req, res) => {
  // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });


  let operator = await Operator.findOne({ _id: req.params.id });
  if (!operator)
    return res.status(400).json({ message: "No Operator with this id exists.", success: 0 });

  await Operator.deleteOne({ _id: req.params.id });

  res.status(200).json({
    message: "Operator has been deleted Successfully",
    success: 1
  });
});

//////////////////////////////////////////////////////////






module.exports = router;
