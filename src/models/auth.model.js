import JoiCustom from "@/core/joiCustom.config"

const passwordPattern = new RegExp("/^$/")
const emailPattern = new RegExp("/^$/")
const privateCodePattern = new RegExp("/^$/")

const authSignInDefaultSchema = JoiCustom.object({
    // user_name: JoiCustom.string().required(),
    email: JoiCustom.string().required(),
    pass_word: JoiCustom.string().pattern(passwordPattern).required()
})

const authSignUpDefaultSchema = JoiCustom.object({
    user_name: JoiCustom.string().required(),
    pass_word: JoiCustom.string().pattern(passwordPattern).required(),
    repeat_pass_word: JoiCustom.string().pattern(passwordPattern).required()
})

const authSignInGoogleSchema = JoiCustom.object({
    user_name: JoiCustom.string().required(),
    pass_word: JoiCustom.string().pattern(passwordPattern).required()
})

const authSignUpGoogleSchema = JoiCustom.object({
    user_name: JoiCustom.string().required(),
    pass_word: JoiCustom.string().pattern(passwordPattern).required()
})

const authVerifySignUpSchema = JoiCustom.object({
    email: JoiCustom.string().pattern(emailPattern).required(),
    private_code: JoiCustom.string().pattern(privateCodePattern).required()
})

const authLogoutSchema = JoiCustom.object({
    user_name: JoiCustom.string().required(),
    access_token: JoiCustom.string().required()
})

const authForgotPasswordSchema = JoiCustom.object({
    email: JoiCustom.string().pattern(emailPattern).required()
})

const authVerifyForgotPasswordSchema = JoiCustom.object({
    email: JoiCustom.string().pattern(emailPattern).required(),
    private_code: JoiCustom.string().pattern(privateCodePattern).required()
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