import Joi from 'joi';
import { IReserve } from '../interfaces/interfaceReserve';

export const validateCreateReserve = (reserve: IReserve) => {
    const reserveSchema = Joi.object({
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
        id_car: Joi.string().required(),
    });

    return reserveSchema.validate(reserve);
}