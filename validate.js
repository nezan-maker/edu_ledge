import Joi, { allow, string } from "joi";
const signupSchema  = Joi.object({
    name:Joi.string().min(4).max(99).required(),
    email:Joi.string().email({tlds:allow}).required(),
    password:string().pattern(new RegExp(^(?=.)))
    })
