const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;
const ExaminerSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
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
  operator_id:{
    type: ObjectId,
    ref : 'Operator',
  },
  
  organization_id: {
    type: ObjectId,
    ref: 'Organization'
  },
  status:{
    type:String,
    enum :["approved", "pending"]
  },
  role: {
    type: String,
    enum: ['examiner']
  }
}, {
  timestamps: true
});

ExaminerSchema.methods.isValidPassword = async function (password) {
  const examiner = this;
  const compare = await bcrypt.compare(password, examiner.password);
  return compare;
};

const Examiner = mongoose.model("Examiner", ExaminerSchema);
function validateExaminer(examiner) {
  const schema = {
    first_name: Joi.string(),
    last_name: Joi.string(),
    address: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string(),
    operator_id: Joi.objectId(),
    organization_id: Joi.objectId(),
    status: Joi.string()

  };
  return Joi.validate(examiner, schema);
}
exports.Examiner = Examiner;
exports.validate = validateExaminer;
