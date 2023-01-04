const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId
const DeviceSchema = new mongoose.Schema({
  device_id: {
    type: String,
  },
  device_installed_location: {
    type: String,
  },
  organization_id:{
    type: String,
    // ref: 'Organization'
  },
  building_id: {
    type: String,
    // ref: 'Building'
  }
  });

const Device = mongoose.model("Device", DeviceSchema);
function validateDevice(Device) {
  const schema = {
    device_id: Joi.string(),
    device_installed_location: Joi.string(),
     organization_id: Joi.string(),
   building_id: Joi.string(),
    // organization_id: Joi.objectId(),
    // building_id: Joi.objectId(),
   
  };
  return Joi.validate(Device, schema);
}
exports.Device = Device;
exports.validate = validateDevice;
