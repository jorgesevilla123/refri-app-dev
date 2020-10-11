import Joi from "joi";




    const email = Joi.string().email().min(8).max(254).lowercase().trim().required()
    const password =  Joi.string().min(8).max(72, 'utf8').required()
    const passwordConfirm =  Joi.valid(Joi.ref('password')).required()




export const registerSchema = Joi.object({
    email,
    password,
    passwordConfirm


})

export const loginSchema = Joi.object({
    email,
    password
})