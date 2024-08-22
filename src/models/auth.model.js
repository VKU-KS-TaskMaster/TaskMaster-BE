import Joi from "joi"

const passwordPattern = new RegExp("/^$/")
const emailPattern = new RegExp("/^$/")
const privateCodePattern = new RegExp("/^$/")

const authSignInDefaultSchema = Joi.object({
    // user_name: Joi.string().required(),
    email: Joi.string().required(),
    pass_word: Joi.string().pattern(passwordPattern).required()
})

const authSignUpDefaultSchema = Joi.object({
    user_name: Joi.string().required(),
    pass_word: Joi.string().pattern(passwordPattern).required()
})

const authSignInGoogleSchema = Joi.object({
    user_name: Joi.string().required(),
    pass_word: Joi.string().pattern(passwordPattern).required()
})

const authSignUpGoogleSchema = Joi.object({
    user_name: Joi.string().required(),
    pass_word: Joi.string().pattern(passwordPattern).required()
})

const authVerifySignUpSchema = Joi.object({
    email: Joi.string().pattern(emailPattern).required(),
    private_code: Joi.string().pattern(privateCodePattern).required()
})

const authLogoutSchema = Joi.object({
    user_name: Joi.string().required(),
    access_token: Joi.string().required()
})

const authForgotPasswordSchema = Joi.object({
    email: Joi.string().pattern(emailPattern).required()
})

const authVerifyForgotPasswordSchema = Joi.object({
    email: Joi.string().pattern(emailPattern).required(),
    private_code: Joi.string().pattern(privateCodePattern).required()
})

export {
    authSignInDefaultSchema,
    authSignUpDefaultSchema,
    authSignInGoogleSchema,
    authSignUpGoogleSchema,
    authVerifySignUpSchema,
    authLogoutSchema,
    authForgotPasswordSchema,
    authVerifyForgotPasswordSchema
}