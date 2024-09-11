import MilestoneStatusEnumArr from "@/enums/milestone/MilestoneStatusEnum"
import BaseJoi from "joi"
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate)

const milestoneKey = "milestone"
const milestoneCacheKey = "milestone_:code_"
const milestoneSearchCacheKey = "milestone.search_:code_"

const milestoneGetSchema = Joi.object({
    key: Joi.string().required()
})

const milestoneGetListSchema = Joi.object({
    q: Joi.string().optional(),

    user_code: Joi.string().optional(),
    project_code: Joi.string().required(),
    start_date: Joi.date().format("YYYY-MM-DD").optional(),
    end_date: Joi.date().format("YYYY-MM-DD").min(Joi.ref('start_date')).optional(),
    
    status: Joi.array().valid(...MilestoneStatusEnumArr).optional(),
    members: Joi.array().items(Joi.string()).optional(), //List member's codes
    teams: Joi.array().items(Joi.string()).optional() //List team's codes
})

const milestoneStoreSchema = Joi.object({
    user_code: Joi.string().required(),
    project_code: Joi.string().required(),

    name: Joi.string().required(),
    status: Joi.number().integer().valid(...MilestoneStatusEnumArr).required(),
    description: Joi.string().max(200).required(),
    begin_date: Joi.date().format("YYYY-MM-DD").default(new Date()).required(),
    due_date: Joi.date().format("YYYY-MM-DD").min(Joi.ref('begin_date')).required(),

    members: Joi.array().items(Joi.object()).optional(),
    teams: Joi.array().items(Joi.object()).optional()
}).unknown()

const milestoneUpdateSchema = Joi.object({
    key: Joi.string().required(),

    name: Joi.string().required(),
    status: Joi.number().integer().valid(...MilestoneStatusEnumArr).required(),
    description: Joi.string().max(200).required(),
    due_date: Joi.date().format("YYYY-MM-DD").required(),

    members: Joi.array().items(Joi.object()).optional(),
    teams: Joi.array().items(Joi.object()).optional()
}).unknown()

const milestoneDestroySchema = Joi.object({
    key: Joi.string().required()
})

const milestoneUpdateMembersSchema = Joi.object({
    key: Joi.string().required(), //MilestoneCode

    members: Joi.array().items(Joi.object()).optional(),
    teams: Joi.array().items(Joi.object()).optional()
}).unknown()

const milestoneSearchMembersSchema = Joi.object({
    q: Joi.string().required()
})

export {
    milestoneKey,
    milestoneCacheKey,
    milestoneSearchCacheKey,

    milestoneGetSchema,
    milestoneGetListSchema,
    milestoneStoreSchema,
    milestoneUpdateSchema,
    milestoneDestroySchema,
    
    milestoneUpdateMembersSchema,
    milestoneSearchMembersSchema
}