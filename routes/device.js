const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { Device, validate } = require("../models/Device");


router.post("/register", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({message:error.details[0].message, success: 0});
  let role = req.user.role;
  let findDevice = await Device.findOne({ device_id: req.body.device_id });
  if (findDevice) return res.json({ message: "Device already Register!", success : 0 });

  if (req.body.device_id === "" || req.body.device_installed_location === "" || req.body.building_id === "" ) return res.status(400).json({message:"All field are required!", success : 0});
  let device = new Device(req.body);
  device.added_by = req.user._id;
  if(role === "admin"){
    device.addValue = 'User'
  }else if(role === 'examiner'){
    device.addValue = 'Examiner'
  }else{
    device.addValue = 'Operator'
  }
  await device.save();

  res.json({
    message: "Device register successfully",
    success: 1 
  });
});


module.exports = router;
