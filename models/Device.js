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
  organization_id:{
    type: ObjectId,
    ref: 'Organization',
    required: true

  },
  building_id: {
    type: ObjectId,
    ref: 'Building',
    required: true

  },
  device_registered_user:{
    type: ObjectId,
    ref : 'Operator',
    required: true
  }
  }, {
    timestamps: true
  });

const Device = mongoose.model("Device", DeviceSchema);
function validateDevice(Device) {
  const schema = {
    device_code: Joi.string(),
    device_installed_location: Joi.string(),
    organization_id: Joi.objectId(),
    building_id: Joi.objectId(),
    device_registered_user: Joi.objectId(),
   
  };
  return Joi.validate(Device, schema);
}
exports.Device = Device;
exports.validate = validateDevice;
