import joi from 'joi';

const clientsSchema = joi.object({
    name: joi.string().required().trim(),
    address: joi.string().required().trim(),
    phone: joi.string().min(10).max(11).required().trim()
});

export default clientsSchema;