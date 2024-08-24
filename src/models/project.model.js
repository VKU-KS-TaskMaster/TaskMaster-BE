import Joi from "joi"

const projectModel = {
    projectGetSchema,
    projectGetListSchema,
    projectStoreSchema,
    projectUpdateSchema,
    projectDestroySchema,
}

const projectGetSchema = Joi.object({
    code: Joi.string().required()
})

const projectGetListSchema = Joi.object({
    search: Joi.string().optional(),
    user_id: Joi.number().integer().optional(),
    space_id: Joi.number().integer().required(),
    type: Joi.number().integer().optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().min(Joi.ref('start_date')).optional(),

    status: Joi.array().items(Joi.number().integer()).optional(),
    members: Joi.array().items(Joi.string()).optional() //List member's codes
})

const projectStoreSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    space_id: Joi.number().integer().required(),
    name: Joi.string().required(),
    status: Joi.number().integer().required(),
    type: Joi.number().integer().required(),
    is_status_custom: Joi.bool().required().default(0),
    has_element_status_custom: Joi.bool().required().default(0),
    description: Joi.string().max(200).required(),
    begin_date: Joi.date().required().default(new Date()),
    end_date: Joi.date().required(),
})

const projectUpdateSchema = Joi.object({
    space_id: Joi.number().integer().required(),
    name: Joi.string().required(),
    status: Joi.number().integer().required(),
    type: Joi.number().integer().required(),
    is_status_custom: Joi.bool().required().default(0),
    has_element_status_custom: Joi.bool().required().default(0),
    description: Joi.string().max(200).required(),
    begin_date: Joi.date().required().default(new Date()),
    end_date: Joi.date().required(),
})

const projectDestroySchema = Joi.object({
    code: Joi.number().integer().required(),
})

export default projectModel

export {
    projectGetSchema,
    projectGetListSchema,
    projectStoreSchema,
    projectUpdateSchema,
    projectDestroySchema,
}