import ProjectStatusEnumArr from "@/core/enums/project/ProjectStatusEnum"
import Joi from "joi"

const projectKey = "project"
const projectCacheKey = "project_:code_"
const projectSearchCacheKey = "project.search_:code_"

const projectGetSchema = Joi.object({
    key: Joi.string().required()
})

const projectGetListSchema = Joi.object({
    q: Joi.string().optional(),

    user_code: Joi.string().optional(),
    space_code: Joi.string().required(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().min(Joi.ref('start_date')).optional(),
    
    status: Joi.array().valid(...ProjectStatusEnumArr).optional(),
    members: Joi.array().items(Joi.string()).optional(), //List member's codes
    teams: Joi.array().items(Joi.string()).optional() //List team's codes
})

const projectStoreSchema = Joi.object({
    user_code: Joi.string().required(),
    space_code: Joi.string().required(),

    name: Joi.string().required(),
    status: Joi.number().integer().valid(...ProjectStatusEnumArr).required(),
    type: Joi.number().integer().required(),
    is_status_custom: Joi.bool().required().default(0),
    has_element_status_custom: Joi.bool().required().default(0),
    description: Joi.string().max(200).required(),
    begin_date: Joi.date().default(new Date()).required(),
    end_date: Joi.date().min(Joi.ref('begin_date')).required(),

    members: Joi.array().items(Joi.object()).optional(),
    teams: Joi.array().items(Joi.object()).optional()
})

const projectUpdateSchema = Joi.object({
    key: Joi.string().required(),

    name: Joi.string().required(),
    status: Joi.number().integer().valid(...ProjectStatusEnumArr).required(),
    type: Joi.number().integer().required(),
    is_status_custom: Joi.bool().default(0).required(),
    has_element_status_custom: Joi.bool().default(0).required(),
    description: Joi.string().max(200).required(),
    begin_date: Joi.date().default(new Date()).required(),
    end_date: Joi.date().min(Joi.ref('begin_date')).required(),

    members: Joi.array().items(Joi.object()).optional(),
    teams: Joi.array().items(Joi.object()).optional()
})

const projectDestroySchema = Joi.object({
    key: Joi.string().required(),
})

const projectChangeStatusSchema = Joi.object({
    key: Joi.string().required(),

    status: Joi.number().integer().valid(...ProjectStatusEnumArr).required(),
})

const projectSearchMembersSchema = Joi.object({
    q: Joi.string().required()
})

export {
    projectKey,
    projectCacheKey,
    projectSearchCacheKey,

    projectGetSchema,
    projectGetListSchema,
    projectStoreSchema,
    projectUpdateSchema,
    projectDestroySchema,

    projectChangeStatusSchema,
    projectSearchMembersSchema
}