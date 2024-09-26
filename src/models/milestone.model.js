import MilestoneStatusEnumArr from "@/enums/milestone/MilestoneStatusEnum";
import JoiCustom from "@/core/joiCustom.config";

const milestoneKey = "milestone";
const milestoneCacheKey = "milestone_:code_";
const milestoneSearchCacheKey = "milestone.search_:code_";

const milestoneGetSchema = JoiCustom.object({
  key: JoiCustom.string().required(),
});

const milestoneSearchSchema = JoiCustom.object({
  q: JoiCustom.string().optional(),

  user_code: JoiCustom.string().optional(),
  project_code: JoiCustom.string().required(),
  start_date: JoiCustom.date().format("YYYY-MM-DD").optional(),
  end_date: JoiCustom.date()
    .format("YYYY-MM-DD")
    .min(JoiCustom.ref("start_date"))
    .optional(),

  status: JoiCustom.stringArray()
    .items(
      JoiCustom.number()
        .integer()
        .valid(...MilestoneStatusEnumArr)
    )
    .optional(),
  members: JoiCustom.stringArray().items(JoiCustom.string()).optional(), //List member's codes
  teams: JoiCustom.stringArray().items(JoiCustom.string()).optional(), //List team's codes
});

const milestoneStoreSchema = JoiCustom.object({
  user_code: JoiCustom.string().required(),
  project_code: JoiCustom.string().required(),

  name: JoiCustom.string().required(),
  status: JoiCustom.number()
    .integer()
    .valid(...MilestoneStatusEnumArr)
    .required(),
  description: JoiCustom.string().max(200).required(),
  begin_date: JoiCustom.date()
    .format("YYYY-MM-DD")
    .default(new Date())
    .required(),
  due_date: JoiCustom.date()
    .format("YYYY-MM-DD")
    .min(JoiCustom.ref("begin_date"))
    .required(),

  members: JoiCustom.array().items(JoiCustom.object()).optional().default([]),
  teams: JoiCustom.array().items(JoiCustom.object()).optional().default([]),
});

const milestoneUpdateSchema = JoiCustom.object({
  key: JoiCustom.string().required(),

  name: JoiCustom.string().required(),
  status: JoiCustom.number()
    .integer()
    .valid(...MilestoneStatusEnumArr)
    .required(),
  description: JoiCustom.string().max(200).required(),
  begin_date: JoiCustom.date().format("YYYY-MM-DD").required(),
  due_date: JoiCustom.date().format("YYYY-MM-DD").required(),

  members: JoiCustom.array().items(JoiCustom.object()).optional().default([]),
  teams: JoiCustom.array().items(JoiCustom.object()).optional().default([]),
});

const milestoneDestroySchema = JoiCustom.object({
  key: JoiCustom.string().required(),
});

//-----------------------------------------------
const milestoneSearchMembersSchema = JoiCustom.object({
  key: JoiCustom.string().required(),

  q: JoiCustom.string().required(),
});

const milestoneUpdateMembersSchema = JoiCustom.object({
  key: JoiCustom.string().required(), //MilestoneCode

  members: JoiCustom.array().items(JoiCustom.object()).optional().default([]),
  teams: JoiCustom.array().items(JoiCustom.object()).optional().default([]),
}).unknown();

export {
  milestoneKey,
  milestoneCacheKey,
  milestoneSearchCacheKey,
  milestoneGetSchema,
  milestoneSearchSchema,
  milestoneStoreSchema,
  milestoneUpdateSchema,
  milestoneDestroySchema,
  milestoneUpdateMembersSchema,
  milestoneSearchMembersSchema,
};
