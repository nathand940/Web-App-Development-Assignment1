import Joi from "joi";

export const UserSpec = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

export const UserCredentialsSpec = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const PlacemarkSpec = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  location: Joi.string().min(2).required(),
});
