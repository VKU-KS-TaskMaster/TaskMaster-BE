import Joi from "joi"

const spaceGetSchema = Joi.object({
    code: Joi.string().optional(),
    name: Joi.string().optional(),
    status: Joi.array().optional(),
    description: Joi.string().optional(),
    created_at: Joi.date().optional()
})

const spaceStoreSchema = Joi.object({
    name: Joi.string().optional(),
    status: Joi.array().optional(),
    description: Joi.string().optional()
})

const spaceUpdateSchema = Joi.object({
    code: Joi.number().integer().required(),
    name: Joi.string().optional(),
    status: Joi.array().optional(),
    description: Joi.string().optional()
})

const spaceDestroySchema = Joi.object({
    code: Joi.number().integer().required(),
    name: Joi.string().optional(),
    status: Joi.array().optional(),
    description: Joi.string().optional()
})

export {
    spaceGetSchema,
    spaceStoreSchema,
    spaceUpdateSchema,
    spaceDestroySchema,
}