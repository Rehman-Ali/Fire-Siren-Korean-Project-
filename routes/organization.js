const express = require("express");
const router = express.Router();
const { Organization, validate } = require("../models/Organization");
const auth = require("../middleware/auth")

/////////// For register orgainization ///////////////
router.post("/register", auth, async (req, res) => {

  if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: 0 });

  let findOrganization = await Organization.findOne({ organization_name: req.body.organization_name });
  if (findOrganization) return res.json({ message: "Organization already Register!", success: 0 });


  let organization = new Organization(req.body);
  await organization.save();

  res.status(200).json({
    message: "Organization register successfully",
    success: 1
  });
});
/////////////////////////////////////////////////////////




/////////// For Get Orgainization With Request to Administrator ID ///////////////

router.get("/list-with-administor", auth, async (req, res) => {
  try {

    if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

    await Organization.find({
      administrator_id: req.user._id
    }).populate({ path: 'administrator_id', select: ['first_name', "last_name", "email", "address", "phone", "role"] }).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data.length < 0) {
          res.status(200).json({
            message: "No organization found!",
            success: 1,
          });
        } else {
          res.status(200).json({
            data: data,
            message: "Organization get successfully.",
            success: 1,
          });
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



////////// GET Specific Organization with ID and Administrator ID    

router.get("/administrator-organization/:id", auth, async (req, res) => {
  try {

    if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

    await Organization.findOne({
      _id: req.params.id,
      administrator_id: req.user._id
    }).populate({ path: 'administrator_id', select: ['first_name', "last_name", "email", "address", "phone", "role"] }).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (!data) {
          res.status(200).json({
            message: "No organization found!",
            success: 1,
          });
        } else {
          res.status(200).json({
            data: data,
            message: "Organization get successfully.",
            success: 1,
          });
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

/////////////////////////////////////////////////////



////////// UPDATE Specific Organization with ID and Administrator ID    

router.put("/administrator-organization/:id", auth, async (req, res) => {
  try {

    if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

    let organization = await Organization.findOne({ _id: req.params.id });

    if (!organization) {
      return res.json({ message: "No organization found with this ID", success: 0 });
    }
    if (JSON.stringify(req.body) === '{}') {
      return res.status(200).json({
        message: "No field provide",
        success: 0
      });
    }

    await Organization.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });

    res.status(200).json({
      message: "Organization has been updated successfully",
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

/////////////////////////////////////////////////////




//////// For Delete Organization ///////////////////////

router.delete("/administrator-organization/:id", auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });


  let organization = await Organization.findOne({ _id: req.params.id });
  if (!organization)
    return res.status(400).json({ message: "No organization with this id exists.", success: 0 });

  await Organization.deleteOne({ _id: req.params.id });

  res.status(200).json({
    message: "organization has been deleted Successfully",
    success: 1
  });
});

//////////////////////////////////////////////////////////





module.exports = router;
