import JoiCustom from "@/core/joiCustom.config"

const userInfoGetSchema = JoiCustom.object({
    search: JoiCustom.string().optional(),
})

const userInfoStoreSchema = JoiCustom.object({
    user_name: JoiCustom.string().required(),
    // email_address: JoiCustom.string().optional(),
    code: JoiCustom.string().optional(),
    first_name: JoiCustom.string().optional(),
    last_name: JoiCustom.string().optional(),
})

const userInfoUpdateSchema = JoiCustom.object({
    user_name: JoiCustom.string().optional(),
    code: JoiCustom.string().optional(),
    first_name: JoiCustom.string().optional(),
    last_name: JoiCustom.string().optional(),
})

const userInfoUpdatePasswordSchema = JoiCustom.object({
    pass_word: JoiCustom.string().required(),
    repeat_pass_word: JoiCustom.string().required(),
})

const userInfoUpdateStatusSchema = JoiCustom.object({
    code: JoiCustom.string().required(),
    status: JoiCustom.number().integer().required(),
})

const userInfoDestroySchema = JoiCustom.object({
    code: JoiCustom.string().required(),
})

export { userInfoGetSchema, userInfoStoreSchema, userInfoUpdateSchema, userInfoUpdatePasswordSchema, userInfoUpdateStatusSchema, userInfoDestroySchema }