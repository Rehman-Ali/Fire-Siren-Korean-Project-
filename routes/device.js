const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { Device, validate } = require("../models/Device");
const { Building } = require("../models/Building");



//////////////// For Register Device ///////////////////////////
router.post("/register", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: 0 });
  let role = req.user.role;
  let findDevice = await Device.findOne({ device_code: req.body.device_code });
  if (findDevice) return res.json({ message: "Device already Register!", success: 0 });

  let findBuilding = await Building.findOne({ _id: req.body.building_id });
  if (!findBuilding) return res.json({ message: "Building not exist!", success: 0 });

  if (req.body.device_code === "" || req.body.device_installed_location === "" || req.body.building_id === "") return res.status(400).json({ message: "All field are required!", success: 0 });
  let device = new Device(req.body);
  device.added_by = req.user._id;
  if (role === "admin") {
    device.addedValue = 'User'
  } else if (role === 'examiner') {
    device.addedValue = 'Examiner'
  } else {
    device.addedValue = 'Operator'
  }
  await device.save();
  res.json({
    message: "Device register successfully",
    success: 1
  });
});
//////////////////////////////////////////////////////////////




/////////// For Get All Device ///////////////

router.get("/list", auth, async (req, res) => {
  try {
    await Device.find().populate([{ path: 'building_id', select: "-_id -organization_id -added_by -addedValue" },
    { path: 'added_by', select: "-password" }
    ]).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data.length > 0) {
          res.status(200).json({ message: 'Device get succesfully', success: 1, data: data })
        } else {
          res.status(200).json({ message: 'No Device exist', success: 1, data: [] })
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



/////////// For Get Single Device  ///////////////

router.get("/:id", auth, async (req, res) => {
  try {
    await Device.findOne({ _id: req.params.id }).populate([{ path: 'building_id', select: "-_id -organization_id -added_by -addedValue" },
    { path: 'added_by', select: "-password" }
    ]).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data) {
          res.status(200).json({ message: 'Device data get successfully', success: 1, data: data })
        } else {
          res.status(200).json({ message: 'No Device exist', success: 1, data: {} })
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




///////////// Update the Device Info  /////////////////

router.put("/:id", auth, async (req, res) => {
  try {
    // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });
    let device = await Device.findOne({ _id: req.params.id });
    console.log("device", device)
    if (!device) {
      return res.json({ message: "No Device found with this ID", success: 0 });
    }
    if (JSON.stringify(req.body) === '{}') {
      return res.status(200).json({
        message: "No field provide",
        success: 0
      });
    }
    await Device.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });

    res.status(200).json({
      message: "Device has been updated successfully",
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



//////// For Delete Device ///////////////////////

router.delete("/:id", auth, async (req, res) => {
  // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

  let device = await Device.findOne({ _id: req.params.id });
  if (!device)
    return res.status(400).json({ message: "No Device with this id exists.", success: 0 });
    
  await Device.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: "Device has been deleted Successfully",
    success: 1
  });

});


//////////////////////////////////////////////////////////





module.exports = router;
