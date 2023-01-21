const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;
const OperatorSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    // unique: true
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  status:{
    type:String,
    enum:["approved", "pending"]
  },
  organization_id: {
    type: ObjectId,
    ref: 'Organization'
  },
  role: {
    type: String,
    enum: ['operator']
  }
}, {
  timestamps: true
});

OperatorSchema.methods.isValidPassword = async function (password) {
  const operator = this;
  const compare = await bcrypt.compare(password, operator.password);
  return compare;
};

const Operator = mongoose.model("Operator", OperatorSchema);
function validateOperator(operator) {
  const schema = {
    first_name: Joi.string(),
    last_name: Joi.string(),
    address: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string(),
    organization_id: Joi.objectId(),
    status: Joi.string()

  };
  return Joi.validate(operator, schema);
}
exports.Operator = Operator;
exports.validate = validateOperator;
