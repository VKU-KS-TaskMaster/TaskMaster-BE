import Joi from "joi"

const spaceModel = {
    spaceGetSchema,
    spaceStoreSchema,
    spaceUpdateSchema,
    spaceDestroySchema,
}

const spaceGetSchema = Joi.object({
    code: Joi.string().required()
})

const spaceGetListSchema = Joi.object({
    search: Joi.string().optional(),
    user_id: Joi.number().integer().optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().min(Joi.ref('start_date')).optional(),

    status: Joi.array().items(Joi.number().integer()).optional(),
})

const spaceStoreSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    name: Joi.string().optional(),
    status: Joi.array().optional(),
    description: Joi.string().optional()
})

const spaceUpdateSchema = Joi.object({
    name: Joi.string().optional(),
    status: Joi.array().optional(),
    description: Joi.string().optional()
})

const spaceDestroySchema = Joi.object({
    code: Joi.number().integer().required(),
})

export default spaceModel

export {
    spaceGetSchema,
    spaceStoreSchema,
    spaceUpdateSchema,
    spaceDestroySchema,
}