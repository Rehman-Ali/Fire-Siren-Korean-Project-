const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const UserSchema = new mongoose.Schema({
  organization_id:'',

  building_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  building_address: {
    type: String,
    minlength: 5,
    maxlength: 50
  },
  building_phone: {
    type: String,
    minlength: 5,
    maxlength: 50
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};
const User = mongoose.model("User", UserSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string(),
    mobile_token: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),

    director_id: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    cnic: Joi.string(),
    roles: Joi.string(),

    // roles: Joi.array().items({
    //   role: Joi.string()
    //     .min(5)
    //     .max(255)
    // })
  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
