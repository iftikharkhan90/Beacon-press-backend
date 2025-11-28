const joi = require("joi")

module.exports = {
 createValidationSchema : joi.object({
    title:joi.string().trim().required(),
    description:joi.string().trim().required(),
    users: joi.array().items(joi.string().length(24).hex()).min(1).optional(),
}),

updateValidationSchema : joi.object({
    title:joi.string().trim().optional(),
    description:joi.string().trim().optional(),
    users: joi.array().items(joi.string().length(24).hex()).min(1).optional()
}),

journalImagevalidationSchemma : joi.object({
    image: joi.object().optional(),
  }),

 journalupdateImagevalidationSchemma : joi.object({
    image: joi.object().optional(),
  }),
}
  