const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { FireAlarm, validate } = require("../models/FireAlarm");
const { Device } = require("../models/Device");
const { Building } = require("../models/Building");
const { raw } = require("body-parser");



/////////// For Get All FireAlarm of specific Device ///////////////
router.get("/list/:device_code", auth, async (req, res) => {
  try {
    // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });
    await FireAlarm.find({ device_code: req.params.device_code }).populate([{
      path: 'device_id', populate: {
        path: 'building_id', select: '-_id -added_by -addedValue', populate: ([{ path: "organization_id", select: '-_id -administrator_id' }])
      }
    }]).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data.length > 0) {
          res.status(200).json({ message: 'Fire Alarms message get succesfully', success: 1, data: data })
        } else {
          res.status(200).json({ message: 'No Fire Alarms exist', success: 1, data: [] })
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
////////////////////////////////////////////////////////////////////


/////////// For Get All FireAlarm of Building ///////////////
router.get("/list-building/:building_id", auth, async (req, res) => {
  try {
    // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

    await FireAlarm.find({ building_id: req.params.building_id }).populate([{
      path: 'building_id'
    }, { path: 'added_by', select: '-_id -password' }]).
      exec(async (err, data) => {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data.length > 0) {
          let getAllDeviceOfBuilding = await Device.find({ building_id: req.params.building_id }).select("device_code -_id");
          //// combine alarm for both from device of all building and alarm for user without device
          await FireAlarm.find({ device_code: { $in: getAllDeviceOfBuilding.map(({ device_code }) => device_code) } }).populate([{
            path: 'device_id', populate: {
              path: 'building_id', select: '-_id -added_by -addedValue', populate: ([{ path: "organization_id", select: '-_id -administrator_id' }])
            }
          }]).
            exec(function (err, data2) {
              if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
              if (data2.length > 0) {
                res.status(200).json({ message: 'Fire Alarms message get succesfully', success: 1, data: [...data2, ...data] })
              }
            });
        } else {
          let getAllDeviceOfBuilding = await Device.find({ building_id: req.params.building_id }).select("device_code -_id");
          //////// alarm for only device /////////////
          await FireAlarm.find({ device_code: { $in: getAllDeviceOfBuilding.map(({ device_code }) => device_code) } }).populate([{
            path: 'device_id', populate: {
              path: 'building_id', select: '-_id -added_by -addedValue', populate: ([{ path: "organization_id", select: '-_id -administrator_id' }])
            }
          }]).
            exec(function (err, data2) {
              if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
              if (data2.length > 0) {
                res.status(200).json({ message: 'Fire Alarms message get succesfully', success: 1, data: data2 })

              }
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
/////////////////////////////////////////////////////////////


/////////// For Get Single Fire Alarm  ///////////////
router.get("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });
    await FireAlarm.findOne({ _id: req.params.id }).populate([{
      path: 'device_id', populate: {
        path: 'building_id', select: '-_id -added_by -addedValue', populate: ([{ path: "organization_id", select: '-_id -administrator_id' }])
      }
    }]).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data) {
          res.status(200).json({ message: 'Fire Alarm data get successfully', success: 1, data: data })
        } else {
          res.status(200).json({ message: 'No Fire Alarm  exist', success: 1, data: {} })
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
//////////////////////////////////////////////////////


//////// For Delete Fire Alarm ///////////////////////////
router.delete("/:id", auth, async (req, res) => {
  try {
    // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

    let fireAlarm = await FireAlarm.findOne({ _id: req.params.id });
    if (fireAlarm === null)
      return res.status(400).json({ message: "No fire alarm data with this id exists.", success: 0 });

    await FireAlarm.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: "Fire Alarm file has been deleted Successfully",
      success: 1
    });

  } catch (error) {
    res.status(200).json({
      message: error,
      success: 0
    });

  }

});
//////////////////////////////////////////////////////////


/////////// for add Fire Alarm from device///////////////
router.post("/send", async (req, res) => {

  // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: 0 });

  let findDevice = await Device.findOne({ device_code: req.body.device_code });
  if (findDevice === null) return res.json({ message: "Device does not exist!", success: 0 });


  // get date with minus 10 minute
  var date2 = new Date();
  date2.setMinutes(date2.getMinutes() - 10); // timestamp
  date2 = new Date(date2); // Date object

  // get all notification within 10 min
  let getAllNotification = await FireAlarm.find({
    createdAt: {
      $gte: date2,
      $lte: new Date()
    }
  });

  // find all device of building and filter notificaton of buildiing device is more then on or not
  let findAllDevicesOfBuiding = await Device.find({ building_id: findDevice.building_id });

  let counter = 0;
  for (var i = 0; i < findAllDevicesOfBuiding.length; i++) {
    let isExist = getAllNotification.filter(item => item.device_code === findAllDevicesOfBuiding[i].device_code);
    if (isExist.length > 0) {
      counter = counter + 1
    }
  }

  // update state of building according if more then one notification from device
  await Building.findOneAndUpdate({ _id: findDevice.building_id }, {
    building_state: counter === 0 ? "Warning" : "Danger"
  }, {
    new: true
  });

  let fireAlarm = new FireAlarm(req.body);
  fireAlarm.device_id = findDevice._id;
  fireAlarm.added_by = findDevice._id;
  fireAlarm.addedValue = "Device";
  await fireAlarm.save();
  res.status(200).json({
    message: "Fire Alarm save successfully",
    success: 1,
  });
});
/////////////////////////////////////////////////////////


///////////// Update the fire alarm  /////////////////
router.put("/:id", auth, async (req, res) => {
  // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

  let fireAlarm = await FireAlarm.findOne({ _id: req.params.id });
  if (fireAlarm === null) {
    return res.json({ message: "No Fire Alarm  is found with this ID", success: 0 });
  }


  await FireAlarm.findOneAndUpdate({ _id: req.params.id }, body, {
    new: true
  });
  res.status(200).json({
    message: "Fire Alarm info update successfully",
    success: 1,
  });

});
//////////////////////////////////////////////////////


/////////// for add Fire Alarm from User ///////////////
router.post("/send-notification", auth, async (req, res) => {

  // if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: 0 });

  // let findDevice = await Device.findOne({ device_code: req.body.device_code });
  // if (findDevice === null) return res.json({ message: "Device does not exist!", success: 0 });


  let fireAlarm = new FireAlarm(req.body);
  fireAlarm.added_by = req.user._id;
  fireAlarm.addedValue = req.user.role === 'admin' ? 'User' : req.user.role === 'operator' ? 'Operator' : 'Examiner';
  await fireAlarm.save();
  res.status(200).json({
    message: "Fire Alarm save successfully",
    success: 1,
  });
});
////////////////////////////////////////////////////////


///////////// For delete fire alarm from User ///////////
router.delete("/delete-notification", auth, async (req, res) => {
  try {

    if (req.user.role !== 'admin') return res.status(200).json({ message: "message is here", success: 0 });

    let findDevice = await FireAlarm.find({ _id: req.user._id });
    if (findDevice) return res.json({ message: "res is here", success: 1 });

    let body = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      state: req.body.state
    }

    await FireAlarm.save(body);

    for (var i = 0; i < findDevice.length; i++) {
      let arr = [];
      let filterArr = findDevice.filter(item => item.start_date > new Date());
      arr.push(filterArr[0]);
    }

    res.state(200).json({
      data: arr,
      message: "Data get Successfuly",
      success: 1
    })

  } catch (err) {
     res.status(400).json({
      message : "Server Issue",
      succcess : 0
     })
  }
});
/////////////////////////////////////////////////////////

module.exports = router;
