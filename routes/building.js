const express = require("express");
const router = express.Router();
const { Building, validate } = require("../models/Building");
const auth = require("../middleware/auth")

/////////// For register building ///////////////
router.post("/register", auth, async (req, res) => {

  if (req.user.role === 'examiner') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: 0 });

  let findBuilding = await Building.findOne({ building_name: req.body.building_name });
  if (findBuilding) return res.json({ message: "Buildiing already Register!", success: 0 });

  let building = new Building(req.body);
  building.added_by = req.user._id;
  if (req.user.role === 'admin') {
    building.addedValue = 'User';
  }
  if (req.user.role === 'operator') {
    building.addedValue = 'Operator';
  }
  await building.save();

  res.status(200).json({
    message: "Building register successfully",
    success: 1
  });

});
/////////////////////////////////////////////////////////




/////////// For Get building ///////////////

router.get("/get-with-organization/:organization_id", auth, async (req, res) => {
  try {

    if (req.user.role === 'examiner') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

    await Building.find({
      organization_id: req.params.organization_id
    })
      .populate([{ path: 'added_by', select: '-_id -password' },
      { path: 'organization_id', select: '-_id -administrator_id', }
      ]).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data.length < 0) {
          res.status(200).json({
            message: "No building found!",
            success: 1,
          });
        } else {
          res.status(200).json({
            data: data,
            message: "Building get successfully.",
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



////////// GET Specific Building with ID     

router.get("/:id", auth, async (req, res) => {
  try {

    if (req.user.role === 'examiner') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

    await Building.findOne({
      _id: req.params.id
    }).populate([{ path: 'added_by', select: '-_id -password' },
    { path: 'organization_id', select: '-_id -administrator_id', }
    ]).
      exec(function (err, data) {
        if (err) return res.status(400).json({ message: "something wrong happened!", success: 0 });
        if (data.length < 0) {
          res.status(200).json({
            message: "No building found!",
            success: 1,
          });
        } else {
          res.status(200).json({
            data: data,
            message: "Building get successfully.",
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



////////// UPDATE Specific Building with ID     

router.put("/:id", auth, async (req, res) => {
  try {

    if (req.user.role === 'examiner') return res.status(400).json({ message: "No permission to perform this action", success: 0 });

    let building = await Building.findOne({ _id: req.params.id });

    if (!building) {
      return res.json({ message: "No building found with this ID", success: 0 });
    }
    if (JSON.stringify(req.body) === '{}') {
      return res.status(200).json({
        message: "No field provide",
        success: 0
      });
    }

    await Building.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });

    res.status(200).json({
      message: "Building has been updated successfully",
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




//////// For Delete Building ///////////////////////

router.delete("/:id", auth, async (req, res) => {
  if (req.user.role === 'examiner') return res.status(400).json({ message: "No permission to perform this action", success: 0 });


  let building = await Building.findOne({ _id: req.params.id });
  if (!building)
    return res.status(400).json({ message: "No building exists with this ID.", success: 0 });

  await Building.deleteOne({ _id: req.params.id });

  res.status(200).json({
    message: "Building has been deleted Successfully",
    success: 1
  });
});

//////////////////////////////////////////////////////////





module.exports = router;
