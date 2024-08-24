import Joi from "joi"

const projectMemberGetListSchema = Joi.object({
    search: Joi.string().optional(),
    project_id: Joi.number().integer().required(),
})

const projectMemberUpdateSchema = Joi.object({
    project_id: Joi.number().integer().required(),

    members: Joi.array().items(Joi.object()).required() //List member's codes
})

export {
    projectMemberGetListSchema,
    projectMemberUpdateSchema,
}