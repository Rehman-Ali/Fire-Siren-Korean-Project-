const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { AlarmSound, validate } = require("../models/AlarmSound");
const { Building } = require("../models/Building");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;


/////////// For Get All AlarmSound ///////////////

router.get("/list/:building_id", auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });
    await AlarmSound.find({ building_id: req.params.building_id }).populate([{ path: 'building_id', select: "-_id -organization_id -added_by -addedValue" },
    { path: 'added_by', select: "-password -_id" }
    ]).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data.length > 0) {
          res.status(200).json({ message: 'Alarm Sound get succesfully', success: 1, data: data })
        } else {
          res.status(200).json({ message: 'No Alarm Sound exist', success: 1, data: [] })
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



/////////// For Get Single AlarmSound  ///////////////
router.get("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });
    await AlarmSound.findOne({ _id: req.params.id }).populate([{ path: 'building_id', select: "-_id -organization_id -added_by -addedValue" },
    { path: 'added_by', select: "-password -_id" }
    ]).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data) {
          res.status(200).json({ message: 'Alarm Sound data get successfully', success: 1, data: data })
        } else {
          res.status(200).json({ message: 'No Alarm Sound exist', success: 1, data: {} })
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
  if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  // Filter the file to validate if it meets the required audio extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };

  // Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
  }).single("audio");

  // upload to cloudinary
  upload(req, res, async (err) => {
    if (err) {
      return res.send(err);
    }


    let alarmSound = await AlarmSound.findOne({ _id: req.params.id });
    if (alarmSound === null) {
      return res.json({ message: "No Alarm sound is found with this ID", success: 0 });
    }


    // SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const { path } = req.file; // file becomes available in req at this point
    console.log("path", path, req)
    const fName = req.file.originalname.split(".")[0];
    // Converting into QR-code image in base-64
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: "raw",
      public_id: alarmSound.alarm_sound_file.public_id
    };
    try {
      // Upload the image
      await cloudinary.uploader.upload(path, options)
        .then(async (result) => {
          let obj = {
            image_url: result.url,
            public_id: result.public_id
          }
          let body = {
            ...req.body,
            alarm_sound_file: obj,

          }
          await AlarmSound.findOneAndUpdate({ _id: req.params.id }, body, {
            new: true
          });
          res.status(200).json({
            message: "Alarm sound update successfully",
            success: 1,
            result: result
          });
        })

    } catch (error) {
      console.error(error);
    }
  });



});
//////////////////////////////



//////// For Delete Device ///////////////////////
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

    let alarmSound = await AlarmSound.findOne({ _id: req.params.id });
    if (alarmSound === null)
      return res.status(400).json({ message: "No Sound data with this id exists.", success: 0 });

    await cloudinary.uploader.destroy(alarmSound.alarm_sound_file.public_id, { resource_type: 'raw' })
      .then(async (result) => {
        console.log(result)
        await AlarmSound.deleteOne({ _id: req.params.id });
      }
      );

    res.status(200).json({
      message: "Alarm sound file has been deleted Successfully",
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


/// for upload audi file///////

router.post("/add", auth, async (req, res) => {

  if (req.user.role !== 'admin') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  // Filter the file to validate if it meets the required audio extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };

  // Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
  }).single("audio");

  // upload to cloudinary
  upload(req, res, async (err) => {
    if (err) {
      return res.send(err);
    }


    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message, success: 0 });

    let findBuilding = await Building.findOne({ _id: req.body.building_id });
    if (!findBuilding) return res.json({ message: "Building does not exist!", success: 0 });

    // SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const { path } = req.file; // file becomes available in req at this point
    console.log("path", path, req)
    const fName = req.file.originalname.split(".")[0];
    // Converting into QR-code image in base-64
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: "raw"
    };
    try {
      // Upload the image
      await cloudinary.uploader.upload(path, options)
        .then(async (result) => {
          let alarmSound = new AlarmSound(req.body);
          let obj = {
            image_url: result.url,
            public_id: result.public_id
          }
          alarmSound.alarm_sound_file = obj;
          alarmSound.added_by = req.user._id;
          alarmSound.addedValue = 'User';
          await alarmSound.save();
          res.status(200).json({
            message: "Building register successfully",
            success: 1,
            result: result
          });
        })

    } catch (error) {
      console.error(error);
    }
  });
});

//...




module.exports = router;
