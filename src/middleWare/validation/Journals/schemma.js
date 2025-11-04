const joi = require("joi")

const createjournalsvalidationSchemma = joi.object({
    title:joi.string().trim().required(),
    description:joi.string().trim().required(),
    users: joi.array().items(joi.string().length(24).hex()).min(1).optional(),
})

const patchjournalsvalidationSchemma = joi.object({
    title:joi.string().trim().optional(),
    description:joi.string().trim().optional(),
    users: joi.array().items(joi.string().length(24).hex()).min(1).optional()
})

const journalImagevalidationSchemma = joi.object({
    image: joi.object().optional(),
  });

const journalPatchImagevalidationSchemma = joi.object({
    image: joi.object().optional(),
  });
  
module.exports = {createjournalsvalidationSchemma,patchjournalsvalidationSchemma,journalImagevalidationSchemma,journalPatchImagevalidationSchemma}