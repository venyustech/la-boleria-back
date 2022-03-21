import joi from 'joi';

export const cakesSchema = joi.object({
    name: joi.string().min(2).trim().required(),
    price: joi.number().min(1).required(),
    description: joi.string().allow(''),
    image: joi.string()
});


export const uriSchema = joi.object({
    name: joi.string().allow(""),
    price: joi.number().allow(""),
    description: joi.string().allow(""),
    image: joi.string().uri().trim().required()
});

