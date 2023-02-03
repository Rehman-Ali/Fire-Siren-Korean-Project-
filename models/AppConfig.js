const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;
const AppConfigSchema = new mongoose.Schema({
  organization_id: {
    type: ObjectId,
    ref: 'Organization'
  },
  app_config: [
    {
      
      btnText: {
        type: String
      },
      btnFunction: {
        type: String
      }

    }
  ],
  role: {
    type: String,
    enum: ['End-User', 'Operator', 'Examiner']
  }
 
}, { timestamps: true }
);

const AppConfig = mongoose.model("AppConfig", AppConfigSchema);
function validateAppConfig(appConfig) {
  const schema = {
    organization_id: Joi.objectId(),
    app_config:  Joi.array().items(
      Joi.object().keys({
        btnText: Joi.string(),
        btnFunction: Joi.string(),
      })),
    role: Joi.string()  
  };
  return Joi.validate(appConfig, schema);
}
exports.AppConfig = AppConfig;
exports.validate = validateAppConfig;
