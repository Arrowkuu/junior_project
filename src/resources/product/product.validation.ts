import Joi from 'joi';

const create = Joi.object({
    Name: Joi.string().max(100).required(),
    Price: Joi.number().required(),
});

const update = Joi.object({
    Id: Joi.number().required(),
    Name: Joi.string().max(100).required(),
    Price: Joi.number().required(),
});

const remove = Joi.object({
    Id: Joi.number().required(),
});

export default { create, update, remove };
