import JoiCustom from "@/core/joiCustom.config"
import CommentStatusEnumArr from "@/enums/comment/CommentStatusEnum"

const commentKey =  "comment"

const commentSearchSchema = JoiCustom.object({
    entity_code: JoiCustom.string().required(),

    parent_code: JoiCustom.string().optional(),
})

const commentStoreSchema = JoiCustom.object({
    entity_code: JoiCustom.string().required(), //Code của đối tượng đang được comment(Project, Task...)

    user_code: JoiCustom.string().required(),
    tagged_user_code: JoiCustom.string().optional(),
    parent_code: JoiCustom.string().optional(),
    status: JoiCustom.number().integer().valid(...CommentStatusEnumArr).required(),
    description: JoiCustom.string().max(200).required(),
})

const commentUpdateSchema = JoiCustom.object({
    key: JoiCustom.string().required(),
    entity_code: JoiCustom.string().required(), //Code của đối tượng đang được comment(Project, Task...)

    tagged_user_code: JoiCustom.string().optional(),
    status: JoiCustom.number().integer().valid(...CommentStatusEnumArr).optional(),
    description: JoiCustom.string().max(200).optional(),
})

const commentDestroySchema = JoiCustom.object({
    key: JoiCustom.string().required(),
    entity_code: JoiCustom.string().required(), //Code của đối tượng đang được comment(Project, Task...)
})

export {
    commentKey,

    commentSearchSchema,
    commentStoreSchema,
    commentUpdateSchema,
    commentDestroySchema,
}