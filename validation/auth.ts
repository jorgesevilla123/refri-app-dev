import Joi from "joi";


export const registerSchema = Joi.object({
    email: Joi.string().email().min(8).max(254).lowercase().trim().required(),
    password: Joi.string().min(8).max(72, 'utf8').required(),
    passwordConfirm: Joi.valid(Joi.ref('password')).required()

})