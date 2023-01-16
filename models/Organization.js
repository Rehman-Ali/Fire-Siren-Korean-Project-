const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;
const OrganizationSchema = new mongoose.Schema({
  administrator_id:{
    type : ObjectId,
    ref:'User',
  },
  organization_name: {
    type: String, 
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
 },{
  timestamps: true
});

const Organization = mongoose.model("Organization", OrganizationSchema);
function validateOrganization(organization) {
  const schema = {
    administrator_id: Joi.objectId(),
    organization_name: Joi.string().required(),
    phone: Joi.string(),
    address: Joi.string().required()
  };
  return Joi.validate(organization, schema);
}
exports.Organization = Organization;
exports.validate = validateOrganization;
