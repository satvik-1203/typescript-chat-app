import Joi from "joi";

const signUpJoiSchema = Joi.object({
  username: Joi.string().required().min(5),
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .min(5)
    .regex(/.*[A-Z].*/)
    .required(),
  friends: Joi.number().default(0),
}).options({ abortEarly: false });

export default signUpJoiSchema;
