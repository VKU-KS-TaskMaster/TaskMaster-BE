import JoiCustom from "@/core/joiCustom.config";

const teamMemberSchema = JoiCustom.object({
  team_code: JoiCustom.string().required(),
  members: JoiCustom.array().items(JoiCustom.object()).required(),
});

export { teamMemberSchema };

