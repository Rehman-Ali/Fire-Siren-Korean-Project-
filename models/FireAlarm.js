const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId
const FireAlarmSchema = new mongoose.Schema({
  device_code: {
    type: String
  },
  device_id: {
    type: ObjectId,
    ref: 'Device',
  },
  building_id: {
    type: ObjectId,
    ref: 'Building',
  },
  alarm_state: {
    type: String,
    enum: ['Info', 'Notify', 'Warning', 'Danger']
  },
  message: {
    type: String
  },
  added_by: {
    type: ObjectId,
    refPath: 'addedValue'
  },
  addedValue: {
    type: String,
    enum: ['User', 'Operator', 'Examiner', 'Device']
  } 
}, {
  timestamps: true
});

const FireAlarm = mongoose.model("FireAlarm", FireAlarmSchema);
function validateFireAlarm(FireAlarm) {
  const schema = {
    device_id: Joi.objectId(),
    building_id: Joi.objectId(),
    message: Joi.string(),
    device_code: Joi.string(),
    alarm_state: Joi.string(),
    added_by: Joi.objectId(),
    addedValue: Joi.string()
  };
  return Joi.validate(FireAlarm, schema);
}
exports.FireAlarm = FireAlarm;
exports.validate = validateFireAlarm;
