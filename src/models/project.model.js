import ProjectStatusEnumArr from "@/enums/project/ProjectStatusEnum"
import BaseJoi from "joi"
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate)

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
    start_date: Joi.date().format("YYYY-MM-DD").optional(),
    end_date: Joi.date().format("YYYY-MM-DD").min(Joi.ref('start_date')).optional(),
    
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
    begin_date: Joi.date().format("YYYY-MM-DD").default(new Date()).required(),
    due_date: Joi.date().format("YYYY-MM-DD").min(Joi.ref('begin_date')).required(),
    
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
    begin_date: Joi.date().format("YYYY-MM-DD").default(new Date()).required(),
    due_date: Joi.date().format("YYYY-MM-DD").min(Joi.ref('begin_date')).required(),
}).unknown()

const projectDestroySchema = Joi.object({
    key: Joi.string().required(),
})

const projectUpdateMembersSchema = Joi.object({
    key: Joi.string().required(), //ProjectCode

    members: Joi.array().items(Joi.object()).optional(),
    teams: Joi.array().items(Joi.object()).optional()
}).unknown()

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

    projectUpdateMembersSchema,
    projectSearchMembersSchema
}