import TaskStatusEnumArr from "@/enums/task/TaskStatusEnum"
import JoiCustom from "@/core/joiCustom.config"

const taskKey = "task"
const taskCacheKey = "task_:code_"
const taskSearchCacheKey = "task.search_:code_"

const taskGetSchema = JoiCustom.object({
    key: JoiCustom.string().required(),
})

const taskGetListSchema = JoiCustom.object({
    q: JoiCustom.string().optional(),

    user_code: JoiCustom.string().optional(),
    project_code: JoiCustom.string().required(),
    milestone_code: JoiCustom.string().optional(),
    start_date: JoiCustom.date().format("YYYY-MM-DD").optional(),
    end_date: JoiCustom.date().format("YYYY-MM-DD").min(JoiCustom.ref('start_date')).optional(),
    
    status: JoiCustom.stringArray().splitStr(',').valid(...TaskStatusEnumArr).optional(),
    members: JoiCustom.stringArray().splitStr(',').items(JoiCustom.string()).optional(), //List member's codes
    teams: JoiCustom.stringArray().splitStr(',').items(JoiCustom.string()).optional() //List team's codes
})

const taskStoreSchema = JoiCustom.object({
    user_code: JoiCustom.string().required(),
    project_code: JoiCustom.string().required(),
    milestone_code: JoiCustom.string().optional(),

    name: JoiCustom.string().required(),
    status: JoiCustom.number().integer().valid(...TaskStatusEnumArr).required(),
    description: JoiCustom.string().max(200).required(),
    begin_date: JoiCustom.date().format("YYYY-MM-DD").default(new Date()).required(),
    due_date: JoiCustom.date().format("YYYY-MM-DD").min(JoiCustom.ref('begin_date')).required(),

    members: JoiCustom.array().items(JoiCustom.object()).optional(),
    teams: JoiCustom.array().items(JoiCustom.object()).optional()
}).unknown()

const taskUpdateSchema = JoiCustom.object({
    key: JoiCustom.string().required(),

    milestone_code: JoiCustom.string().optional(),
    name: JoiCustom.string().required(),
    status: JoiCustom.number().integer().valid(...TaskStatusEnumArr).required(),
    description: JoiCustom.string().max(200).required(),
    due_date: JoiCustom.date().format("YYYY-MM-DD").required(),

    members: JoiCustom.array().items(JoiCustom.object()).optional(),
    teams: JoiCustom.array().items(JoiCustom.object()).optional()
}).unknown()

const taskDestroySchema = JoiCustom.object({
    key: JoiCustom.string().required()
})

const taskChangeStatusSchema = JoiCustom.object({
    key: JoiCustom.string().required(),

    status: JoiCustom.number().integer().valid(...TaskStatusEnumArr).required(),
}).unknown()

const taskChangeDueDateSchema = JoiCustom.object({
    key: JoiCustom.string().required(),

    due_date: JoiCustom.date().format("YYYY-MM-DD").required(),
}).unknown()

const taskSearchMembersSchema = JoiCustom.object({
    q: JoiCustom.string().required()
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