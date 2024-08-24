import Joi from "joi"

const milestoneModel = {
    milestoneGetSchema,
    milestoneGetListSchema,
    milestoneStoreSchema,
    milestoneUpdateSchema,
    milestoneDestroySchema
}

const milestoneGetSchema = Joi.object({
    code: Joi.string().required()
})

const milestoneGetListSchema = Joi.object({
    search: Joi.string().optional(),
    user_id: Joi.number().integer().optional(),
    project_id: Joi.number().integer().required(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().min(Joi.ref('start_date')).optional(),

    status: Joi.array().items(Joi.number().integer()).optional(),
    members: Joi.array().items(Joi.string()).optional() //List member's codes
})

const milestoneStoreSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    project_id: Joi.number().integer().required(),
    name: Joi.string().required(),
    status: Joi.number().integer().required(),
    description: Joi.string().max(200).required(),
    begin_date: Joi.date().required().default(new Date()),
    end_date: Joi.date().required(),
})

const milestoneUpdateSchema = Joi.object({
    project_id: Joi.number().integer().required(),
    name: Joi.string().required(),
    status: Joi.number().integer().required(),
    description: Joi.string().max(200).required(),
    begin_date: Joi.date().required().default(new Date()),
    end_date: Joi.date().required(),
})

const milestoneDestroySchema = Joi.object({
    code: Joi.number().integer().required(),
})

export default milestoneModel

export {
    milestoneGetSchema,
    milestoneGetListSchema,
    milestoneStoreSchema,
    milestoneUpdateSchema,
    milestoneDestroySchema,
}