import MilestoneStatusEnumArr from "@/enums/milestone/MilestoneStatusEnum"
import JoiCustom from "@/core/joiCustom.config"

const milestoneKey = "milestone"
const milestoneCacheKey = "milestone_:code_"
const milestoneSearchCacheKey = "milestone.search_:code_"

const milestoneGetSchema = JoiCustom.object({
    key: JoiCustom.string().required()
})

const milestoneGetListSchema = JoiCustom.object({
    q: JoiCustom.string().optional(),

    user_code: JoiCustom.string().optional(),
    project_code: JoiCustom.string().required(),
    start_date: JoiCustom.date().format("YYYY-MM-DD").optional(),
    end_date: JoiCustom.date().format("YYYY-MM-DD").min(JoiCustom.ref('start_date')).optional(),
    
    status: JoiCustom.stringArray().splitStr(',').valid(...MilestoneStatusEnumArr).optional(),
    members: JoiCustom.stringArray().splitStr(',').items(JoiCustom.string()).optional(), //List member's codes
    teams: JoiCustom.stringArray().splitStr(',').items(JoiCustom.string()).optional() //List team's codes
})

const milestoneStoreSchema = JoiCustom.object({
    user_code: JoiCustom.string().required(),
    project_code: JoiCustom.string().required(),

    name: JoiCustom.string().required(),
    status: JoiCustom.number().integer().valid(...MilestoneStatusEnumArr).required(),
    description: JoiCustom.string().max(200).required(),
    begin_date: JoiCustom.date().format("YYYY-MM-DD").default(new Date()).required(),
    due_date: JoiCustom.date().format("YYYY-MM-DD").min(JoiCustom.ref('begin_date')).required(),

    members: JoiCustom.array().items(JoiCustom.object()).optional(),
    teams: JoiCustom.array().items(JoiCustom.object()).optional()
}).unknown()

const milestoneUpdateSchema = JoiCustom.object({
    key: JoiCustom.string().required(),

    name: JoiCustom.string().required(),
    status: JoiCustom.number().integer().valid(...MilestoneStatusEnumArr).required(),
    description: JoiCustom.string().max(200).required(),
    due_date: JoiCustom.date().format("YYYY-MM-DD").required(),

    members: JoiCustom.array().items(JoiCustom.object()).optional(),
    teams: JoiCustom.array().items(JoiCustom.object()).optional()
}).unknown()

const milestoneDestroySchema = JoiCustom.object({
    key: JoiCustom.string().required()
})

const milestoneUpdateMembersSchema = JoiCustom.object({
    key: JoiCustom.string().required(), //MilestoneCode

    members: JoiCustom.array().items(JoiCustom.object()).optional(),
    teams: JoiCustom.array().items(JoiCustom.object()).optional()
}).unknown()

const milestoneSearchMembersSchema = JoiCustom.object({
    q: JoiCustom.string().required()
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