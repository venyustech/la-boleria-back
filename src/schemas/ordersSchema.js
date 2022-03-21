import joi from 'joi';

const ordersSchema = joi.object({
    clientId: joi.number().required(),
    cakeId: joi.number().required(),
    quantity: joi.number().min(1).max(4).required(),
    totalPrice: joi.number()
});

export default ordersSchema;