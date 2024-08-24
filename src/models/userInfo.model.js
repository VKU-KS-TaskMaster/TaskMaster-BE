import Joi from "joi"

const userInfoGetSchema = Joi.object({
    search: Joi.string().optional(),
})

const userInfoStoreSchema = Joi.object({
    user_name: Joi.string().required(),
    // email_address: Joi.string().optional(),
    code: Joi.string().optional(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
})

const userInfoUpdateSchema = Joi.object({
    user_name: Joi.string().optional(),
    code: Joi.string().optional(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
})

const userInfoUpdatePasswordSchema = Joi.object({
    pass_word: Joi.string().required(),
    repeat_pass_word: Joi.string().required(),
})

const userInfoUpdateStatusSchema = Joi.object({
    code: Joi.string().required(),
    status: Joi.number().integer().required(),
})

const userInfoDestroySchema = Joi.object({
    code: Joi.string().required(),
})

export { userInfoGetSchema, userInfoStoreSchema, userInfoUpdateSchema, userInfoUpdatePasswordSchema, userInfoUpdateStatusSchema, userInfoDestroySchema }