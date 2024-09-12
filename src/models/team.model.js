import TeamStatusEnumArr from "@/enums/TeamStatusEnum";
import JoiCustom from "@/core/joiCustom.config";

const teamKey = "team";
const teamCacheKey = "team_:code_";
const teamSearchCacheKey = "team.search_:code_";

const teamSchema = JoiCustom.object({
  name: JoiCustom.string().max(200).required(),
  description: JoiCustom.string().allow("", null),
  status: JoiCustom.number().integer().valid(...TeamStatusEnumArr).required(),
});

const teamUpdateSchema = JoiCustom.object({
  name: JoiCustom.string().max(200),
  description: JoiCustom.string().allow("", null),
  status: JoiCustom.number().integer().valid(...TeamStatusEnumArr).required(),
}).min(1);

const searchParamsSchema = JoiCustom.object({
  name: JoiCustom.string().optional(),
  code: JoiCustom.string().optional(),
  status: JoiCustom.array().items(JoiCustom.number().integer()).optional(),
})

const idSchema = JoiCustom.string().required();

module.exports = {
  teamKey,
  teamCacheKey,
  teamSearchCacheKey,

  teamSchema,
  teamUpdateSchema,
  searchParamsSchema,
  idSchema
};
