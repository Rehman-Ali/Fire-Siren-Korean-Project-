const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role:{
    type: String,
    enum:['admin', 'super-admin']
  }
}, {
  timestamps: true
});
UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};
const User = mongoose.model("User", UserSchema);
function validateUser(user) {
  const schema = {
    first_name: Joi.string(),
    last_name: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
