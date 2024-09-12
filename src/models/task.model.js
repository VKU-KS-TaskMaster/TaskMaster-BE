import TaskStatusEnumArr from "@/enums/task/TaskStatusEnum"
import BaseJoi from "joi"
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate)

const taskKey = "task"
const taskCacheKey = "task_:code_"
const taskSearchCacheKey = "task.search_:code_"

const taskGetSchema = Joi.object({
    key: Joi.string().required(),
})

const taskGetListSchema = Joi.object({
    q: Joi.string().optional(),

    user_code: Joi.string().optional(),
    project_code: Joi.string().required(),
    milestone_code: Joi.string().optional(),
    start_date: Joi.date().format("YYYY-MM-DD").optional(),
    end_date: Joi.date().format("YYYY-MM-DD").min(Joi.ref('start_date')).optional(),
    
    status: Joi.array().valid(...TaskStatusEnumArr).optional(),
    members: Joi.array().items(Joi.string()).optional(), //List member's codes
    teams: Joi.array().items(Joi.string()).optional() //List team's codes
})

const taskStoreSchema = Joi.object({
    user_code: Joi.string().required(),
    project_code: Joi.string().required(),
    milestone_code: Joi.string().optional(),

    name: Joi.string().required(),
    status: Joi.number().integer().valid(...TaskStatusEnumArr).required(),
    description: Joi.string().max(200).required(),
    begin_date: Joi.date().format("YYYY-MM-DD").default(new Date()).required(),
    due_date: Joi.date().format("YYYY-MM-DD").min(Joi.ref('begin_date')).required(),

    members: Joi.array().items(Joi.object()).optional(),
    teams: Joi.array().items(Joi.object()).optional()
})

const taskUpdateSchema = Joi.object({
    key: Joi.string().required(),

    milestone_code: Joi.string().optional(),
    name: Joi.string().required(),
    status: Joi.number().integer().valid(...TaskStatusEnumArr).required(),
    description: Joi.string().max(200).required(),
    due_date: Joi.date().format("YYYY-MM-DD").required(),

    members: Joi.array().items(Joi.object()).optional(),
    teams: Joi.array().items(Joi.object()).optional()
})

const taskDestroySchema = Joi.object({
    key: Joi.string().required()
})

const taskChangeStatusSchema = Joi.object({
    key: Joi.string().required(),

    status: Joi.number().integer().valid(...TaskStatusEnumArr).required(),
})

const taskChangeDueDateSchema = Joi.object({
    key: Joi.string().required(),

    due_date: Joi.date().format("YYYY-MM-DD").required(),
})

const taskSearchMembersSchema = Joi.object({
    q: Joi.string().required()
})

export {
    taskKey,
    taskCacheKey,
    taskSearchCacheKey,

    taskGetSchema,
    taskGetListSchema,
    taskStoreSchema,
    taskUpdateSchema,
    taskDestroySchema,
    
    taskChangeStatusSchema,
    taskChangeDueDateSchema,
    taskSearchMembersSchema
}