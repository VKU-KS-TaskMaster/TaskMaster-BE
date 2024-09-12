import JoiCustom from "@/core/joiCustom.config"

const projectMemberGetListSchema = JoiCustom.object({
    search: JoiCustom.string().optional(),
    project_id: JoiCustom.number().integer().required(),
})

const projectMemberUpdateSchema = JoiCustom.object({
    project_id: JoiCustom.number().integer().required(),

    members: JoiCustom.array().items(JoiCustom.object()).required() //List member's codes
})

export {
    projectMemberGetListSchema,
    projectMemberUpdateSchema,
}