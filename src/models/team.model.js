import TeamStatusEnumArr from "@/enums/TeamStatusEnum";
import Joi from "joi";

const teamKey = "team";
const teamCacheKey = "team_:code_";
const teamSearchCacheKey = "team.search_:code_";

const teamSchema = Joi.object({
  name: Joi.string().max(200).required(),
  description: Joi.string().allow("", null),
  status: Joi.number().integer().valid(...TeamStatusEnumArr).required(),
});

const teamUpdateSchema = Joi.object({
  name: Joi.string().max(200),
  description: Joi.string().allow("", null),
  status: Joi.number().integer().valid(...TeamStatusEnumArr).required(),
}).min(1);

const searchParamsSchema = Joi.object({
  name: Joi.string().optional(),
  code: Joi.string().optional(),
  status: Joi.array().items(Joi.number().integer()).optional(),
})

const idSchema = Joi.string().required();

module.exports = {
  teamKey,
  teamCacheKey,
  teamSearchCacheKey,

  teamSchema,
  teamUpdateSchema,
  searchParamsSchema,
  idSchema
};
