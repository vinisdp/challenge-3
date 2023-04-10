import Joi from 'joi';
import { ICar } from '../interfaces/interfaceCar';

export const validateCreateCar = (car: ICar) => {
    const carSchema = Joi.object({
        model: Joi.string().required(),
        color: Joi.string().required(),
        year: Joi.number().required(),
        value_per_day: Joi.number().required(),
    });

    return carSchema.validate(car);
}