import Joi from "joi"

const projectSchema = Joi.object({
    id: Joi.number(),
    code: Joi.string(),
    name: Joi.string(),
    status: Joi.number().required(),
    type: Joi.number().required(),
    is_status_custom: Joi.bool().required().default(0),
    has_element_status_custom: Joi.bool().required().default(0),
    description: Joi.string().max(200).optional(),
    begin_date: Joi.date().required().default(new Date()),
    end_date: Joi.date().required(),
    created_at: Joi.date().required().default(new Date()),
    updated_at: Joi.date().required().default(new Date()),
    deleted_at: Joi.date().optional().default(null),
})

const projectStoreSchema = Joi.object({
    name: Joi.string(),
    status: Joi.number().integer().required(),
    type: Joi.number().integer().required(),
    is_status_custom: Joi.bool().required().default(0),
    has_element_status_custom: Joi.bool().required().default(0),
    description: Joi.string().max(200).optional(),
    begin_date: Joi.date().required().default(new Date()),
    end_date: Joi.date().required(),
})

export default projectSchema
export { projectStoreSchema }