const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId
const FireAlarmSchema = new mongoose.Schema({
  device_code:{
    type: String
  },
  device_id: {
    type: ObjectId,
    ref: 'Device',
  },
  message:{
    type: String
  }
  }, {
    timestamps: true
  });

const FireAlarm = mongoose.model("FireAlarm", FireAlarmSchema);
function validateFireAlarm(FireAlarm) {
  const schema = {
    device_id: Joi.objectId(),
    message:Joi.string(),
    device_code: Joi.string()
   
  };
  return Joi.validate(FireAlarm, schema);
}
exports.FireAlarm = FireAlarm;
exports.validate = validateFireAlarm;
