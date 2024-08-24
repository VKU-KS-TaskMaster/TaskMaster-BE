import Joi from "joi"

const userInfoGetSchema = Joi.object({
    code: Joi.string().optional(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
})

const userInfoStoreSchema = Joi.object({
    user_name: Joi.string().required(),
    code: Joi.string().optional(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
})

const userInfoUpdateSchema = Joi.object({
    code: Joi.string().optional(),
    email_address: Joi.string().optional(),
    status: Joi.number().integer().optional(),
    type: Joi.number().integer().optional(),
    description: Joi.string().optional(),
})

const userInfoUpdatePasswordSchema = Joi.object({
    pass_word: Joi.string().required(),
    verified_pass_word: Joi.string().required(),
})

const userInfoUpdateStatusSchema = Joi.object({
    code: Joi.string().required(),
    status: Joi.number().integer().required(),
})

const userInfoDestroySchema = Joi.object({
    code: Joi.string().required(),
})

export { userInfoGetSchema, userInfoStoreSchema, userInfoUpdateSchema, userInfoUpdatePasswordSchema, userInfoUpdateStatusSchema, userInfoDestroySchema }