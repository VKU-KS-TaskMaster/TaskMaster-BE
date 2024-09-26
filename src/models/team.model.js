import JoiCustom from "@/core/joiCustom.config";
import TeamMemberTypeEnumArr from "@/enums/team/TeamMemberEnum";
import TeamStatusEnumArr from "@/enums/team/TeamStatusEnum";

const teamKey = "team";
const teamCacheKey = "team_:code_";
const teamSearchCacheKey = "team.search_:code_";

const teamSchema = JoiCustom.object({
  name: JoiCustom.string().max(200).required(),
  description: JoiCustom.string().allow("", null),
  status: JoiCustom.number().integer().valid(...TeamStatusEnumArr).required(),
  members: JoiCustom.array().items(
    JoiCustom.object({
      user_code: JoiCustom.string().required(),
      type: JoiCustom.number().integer().valid(...TeamMemberTypeEnumArr).required(),
      joined_at: JoiCustom.date().required(),
    })
  ).default([]),
});

const teamUpdateSchema = JoiCustom.object({
  key: JoiCustom.string().required(),

  name: JoiCustom.string().max(200),
  description: JoiCustom.string().allow("", null),
  status: JoiCustom.number().integer().valid(...TeamStatusEnumArr).required(),
}).min(1);

const searchParamsSchema = JoiCustom.object({
  name: JoiCustom.string().optional(),
  code: JoiCustom.string().optional(),
  
  status: JoiCustom.stringArray().items(JoiCustom.number().integer().valid(...TeamStatusEnumArr)).optional()
})

const teamGetSchema = JoiCustom.object({
  key: JoiCustom.string().required()
})

export {
  teamGetSchema, searchParamsSchema, teamCacheKey, teamKey, teamSchema, teamSearchCacheKey, teamUpdateSchema
};

