const mongoose = require("mongoose");
const Joi = require("joi");
const DeviceSchema = new mongoose.Schema({
  device_id: {
    type: String,
  },
  device_installed_location: {
    type: String,
   
  },
  building_id: {
    type: String,
  }
  });

const Device = mongoose.model("Device", DeviceSchema);
function validateDevice(Device) {
  const schema = {
    device_id: Joi.string(),
    device_installed_location: Joi.string(),
    building_id: Joi.string(),
   
  };
  return Joi.validate(Device, schema);
}
exports.Device = Device;
exports.validate = validateDevice;
