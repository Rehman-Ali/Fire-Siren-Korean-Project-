const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const string = require("joi/lib/types/string");
Joi.objectId = require('joi-objectid')(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;
const BuildingSchema = new mongoose.Schema({
  organization_id: {
    type: ObjectId,
    ref: 'Organization'
  },
  building_name: {
    type: String,
  },
  building_address: {
    type: String,
  },
  building_phone: {
    type: String,
  },
  building_state: {
    type: String,
    enum:['Safe', 'Info', 'Notify', 'Warning', 'Danger'],
    default:"Safe" 
  },
  qr_info: {
    image_url:{
      type: String,
    },
    public_id:{
      type: String
    }
  },
  added_by:{
    type: ObjectId,
    refPath: 'addedValue'
  },
  addedValue: {
    type: String,
    enum: ['User', 'Operator']
  }
}, { timestamps: true }
);

const Building = mongoose.model("Building", BuildingSchema);
function validateBuilding(building) {
  const schema = {
    organization_id: Joi.string(),
    building_name: Joi.string(),
    building_address: Joi.string(),
    building_phone: Joi.string(),
    qr_info: Joi.object({
      image_url: Joi.string(),
      public_id: Joi.string()
    }),
    addedValue: Joi.string(),
    added_by: Joi.objectId(),
    building_state: Joi.string()
  };
  return Joi.validate(building, schema);
}
exports.Building = Building;
exports.validate = validateBuilding;
