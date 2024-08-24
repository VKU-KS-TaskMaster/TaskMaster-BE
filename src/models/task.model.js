import Joi from "joi"

const taskModel = {
    taskGetSchema,
    taskGetListSchema,
    taskStoreSchema,
    taskUpdateSchema,
    taskDestroySchema,
}

const taskGetSchema = Joi.object({
    code: Joi.string().required()
})

const taskGetListSchema = Joi.object({
    search: Joi.string().optional(),
    user_id: Joi.number().integer().optional(),
    project_id: Joi.number().integer().required(),
    milestone_id: Joi.number().integer().optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().min(Joi.ref('start_date')).optional(),

    status: Joi.array().items(Joi.number().integer()).optional(),
    members: Joi.array().items(Joi.string()).optional() //List member's codes
})

const taskStoreSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    project_id: Joi.number().integer().required(),
    milestone_id: Joi.number().integer().optional(),
    name: Joi.string().required(),
    status: Joi.number().integer().required(),
    description: Joi.string().max(200).required(),
    begin_date: Joi.date().required().default(new Date()),
    end_date: Joi.date().required(),
})

const taskUpdateSchema = Joi.object({
    project_id: Joi.number().integer().required(),
    milestone_id: Joi.number().integer().optional(),
    name: Joi.string().required(),
    status: Joi.number().integer().required(),
    description: Joi.string().max(200).required(),
    begin_date: Joi.date().required().default(new Date()),
    end_date: Joi.date().required(),
})

const taskDestroySchema = Joi.object({
    code: Joi.number().integer().required(),
})

export default taskModel

export {
    taskGetSchema,
    taskGetListSchema,
    taskStoreSchema,
    taskUpdateSchema,
    taskDestroySchema,
}