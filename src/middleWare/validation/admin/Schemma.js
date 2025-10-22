const Joi = require("joi")


const adminloginValidationSchema = Joi.object({
     email: Joi.string().trim().email().required(),
     password: Joi.string().trim().required(),
})


module.exports = {adminloginValidationSchema}