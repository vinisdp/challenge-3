import mongoose, { Schema, Document } from 'mongoose';
import { ICar } from '../interfaces/interfaceCar';
import Joi from 'joi';


const CarSchema = new Schema({
    model: Joi.string().required(),
    color: Joi.string().required(),
    year: Joi.number().required(),
    value_per_day: Joi.number().required(),
});

export default mongoose.model<ICar>('Car', CarSchema);