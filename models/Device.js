const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId
const DeviceSchema = new mongoose.Schema({
  device_code: {
    type: String,
    required: true
  },
  device_installed_location: {
    type: String,
    required: true
  },
  building_id: {
    type: ObjectId,
    ref: 'Building',
    required: true
  },
  added_by:{
    type: ObjectId,
    refPath : 'addedValue',
  },
  addedValue: {
    type: String,
    enum: ['User', 'Operator', "Examiner"]
  }
  }, {
    timestamps: true
  });

const Device = mongoose.model("Device", DeviceSchema);
function validateDevice(Device) {
  const schema = {
    device_code: Joi.string(),
    device_installed_location: Joi.string(),
    building_id: Joi.objectId(),
    added_by: Joi.objectId(),
    addedValue:Joi.string(),
   
  };
  return Joi.validate(Device, schema);
}
exports.Device = Device;
exports.validate = validateDevice;
