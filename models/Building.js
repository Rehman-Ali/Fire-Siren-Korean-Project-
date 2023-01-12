const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
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
  added_by:{
    type: ObjectId,
    refPath: 'addedValue'
  },
  addedValue: {
    type: String,
    required: true,
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
    added_by: Joi.objectId(),
  };
  return Joi.validate(building, schema);
}
exports.Building = Building;
exports.validate = validateBuilding;
