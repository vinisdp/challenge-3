import mongoose, { Schema, Document } from 'mongoose';
import { ICar } from '../interfaces/interfaceCar';


const CarSchema = new Schema({
    model: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    color: {
        type: String,
        required: [true, 'Please enter your cpf'],
    },
    year: {
        type: Date,
        required: [true],
    },
    value_per_day: {
        type: Number,
        required: [true, 'Please provide your email'],
    },
});

export default mongoose.model<ICar>('Car', CarSchema);