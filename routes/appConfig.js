const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { AppConfig, validate } = require("../models/AppConfig");



//////////////// For Save App Config with respect to Role ///////////////////////////
router.post("/save", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: 0 });
 
  let appConfig = new AppConfig(req.body);
 
  await appConfig.save();
  res.json({
    message: "AppConfig save successfully",
    success: 1
  });
});
//////////////////////////////////////////////////////////////


/////////// For Get All Appconfig of Organzation ///////////////

router.get("/list/:organization_id", auth, async (req, res) => {
  try {
    await AppConfig.find({ organization_id : req.params.organization_id}).populate([{ path: 'organization_id', select: "-_id " }
    ]).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data.length > 0) {
          res.status(200).json({ message: 'Data get succesfully', success: 1, data: data })
        } else {
          res.status(200).json({ message: 'No Data exist', success: 1, data: [] })
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



/////////// For Get Single AppConfig  ///////////////
router.get("/:id", auth, async (req, res) => {
  try {
    await AppConfig.findOne({ _id: req.params.id }).populate([{ path: 'organization_id', select: "-_id" },
    ]).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data) {
          res.status(200).json({ message: 'Data get successfully', success: 1, data: data })
        } else {
          res.status(200).json({ message: 'No Data exist', success: 1, data: {} })
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




///////////// Update the AppConfig Info  /////////////////
router.put("/:id", auth, async (req, res) => {
  try {
    // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });
    let appConfig = await AppConfig.findOne({ _id: req.params.id });
    if (!appConfig) {
      return res.json({ message: "No appConfig data found with this ID", success: 0 });
    }
    if (JSON.stringify(req.body) === '{}') {
      return res.status(200).json({
        message: "No field provide",
        success: 0
      });
    }
    await AppConfig.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });

    res.status(200).json({
      message: "Appcofig data has been updated successfully",
      success: 1
    });

  } catch (err) {
    console.log("err", err)
    res.status(500).json({
      data: [],
      message: "Server Internal Error.",
      success: 0,
    });
  }
});
//////////////////////////////



//////// For Delete AppConfig ///////////////////////
router.delete("/:id", auth, async (req, res) => {
  // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

  let appConfig = await AppConfig.findOne({ _id: req.params.id });
  if (!appConfig)
    return res.status(400).json({ message: "No AppConfig with this id exists.", success: 0 });

  await AppConfig.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: "AppConfig data has been deleted Successfully",
    success: 1
  });

});
//////////////////////////////////////////////////////////





module.exports = router;
