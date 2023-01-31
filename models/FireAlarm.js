const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId
const AlarmSoundSchema = new mongoose.Schema({
  alarm_sound_file:{
      image_url:{
        type: String,
      },
      public_id:{
        type: String
      }
  },
  building_id: {
    type: ObjectId,
    ref: 'Building',
  },
  added_by:{
    type: ObjectId,
    refPath : 'addedValue',
  },
  addedValue: {
    type: String,
    enum: ['User']
  }
  }, {
    timestamps: true
  });

const AlarmSound = mongoose.model("AlarmSound", AlarmSoundSchema);
function validateAlarmSound(AlarmSound) {
  const schema = {
    alarm_sound_file:  Joi.object({
      image_url: Joi.string(),
      public_id: Joi.string()
    }),
    building_id: Joi.objectId(),
    added_by: Joi.objectId(),
    addedValue:Joi.string(),
   
  };
  return Joi.validate(AlarmSound, schema);
}
exports.AlarmSound = AlarmSound;
exports.validate = validateAlarmSound;
