import ProjectStatusEnumArr from "@/enums/project/ProjectStatusEnum";
import JoiCustom from "@/core/joiCustom.config";

const projectKey = "project";
const projectCacheKey = "project_:code_";
const projectSearchCacheKey = "project.search_:code_";

const projectGetSchema = JoiCustom.object({
  key: JoiCustom.string().required(),
});

const projectSearchSchema = JoiCustom.object({
  q: JoiCustom.string().optional(),

  user_code: JoiCustom.string().optional(),
  space_code: JoiCustom.string().required(),
  start_date: JoiCustom.date().format("YYYY-MM-DD").optional(),
  end_date: JoiCustom.date()
    .format("YYYY-MM-DD")
    .min(JoiCustom.ref("start_date"))
    .optional(),

  status: JoiCustom.stringArray()
    .items(
      JoiCustom.number()
        .integer()
        .valid(...ProjectStatusEnumArr)
    )
    .optional(),
  members: JoiCustom.stringArray().items(JoiCustom.string()).optional(), //List member's codes
  teams: JoiCustom.stringArray().items(JoiCustom.string()).optional(), //List team's codes
});

const projectStoreSchema = JoiCustom.object({
  user_code: JoiCustom.string().required(),
  space_code: JoiCustom.string().required(),

  name: JoiCustom.string().required(),
  status: JoiCustom.number()
    .integer()
    .valid(...ProjectStatusEnumArr)
    .required(),
  type: JoiCustom.number().integer().required(),
  is_status_custom: JoiCustom.bool().required().default(0),
  has_element_status_custom: JoiCustom.bool().required().default(0),
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

const projectUpdateSchema = JoiCustom.object({
  key: JoiCustom.string().required(),

  name: JoiCustom.string().required(),
  status: JoiCustom.number()
    .integer()
    .valid(...ProjectStatusEnumArr)
    .required(),
  type: JoiCustom.number().integer().required(),
  is_status_custom: JoiCustom.bool().default(0).required(),
  has_element_status_custom: JoiCustom.bool().default(0).required(),
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

const projectDestroySchema = JoiCustom.object({
  key: JoiCustom.string().required(),
});

//-------------------------------------------------
const projectSearchMembersSchema = JoiCustom.object({
  key: JoiCustom.string().required(), //ProjectCode

  q: JoiCustom.string().required(),
});

const projectUpdateMembersSchema = JoiCustom.object({
  key: JoiCustom.string().required(), //ProjectCode

  members: JoiCustom.array().items(JoiCustom.object()).optional().default([]),
  teams: JoiCustom.array().items(JoiCustom.object()).optional().default([]),
});

export {
  projectKey,
  projectCacheKey,
  projectSearchCacheKey,
  projectGetSchema,
  projectSearchSchema,
  projectStoreSchema,
  projectUpdateSchema,
  projectDestroySchema,
  projectUpdateMembersSchema,
  projectSearchMembersSchema,
};
