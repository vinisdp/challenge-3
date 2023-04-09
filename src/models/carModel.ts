import mongoose, { Schema } from 'mongoose';
import { ICar } from '../interfaces/interfaceCar';


const CarSchema = new Schema({
    model: {
        type: String,
        required: [true, 'Please enter client is qualified'],
    },
    color: {
        type: String,
        required: [true, 'Please enter client is qualified'],
    },
    year: {
        type: Number,
        required: [true, 'Please enter client is qualified'],
    },
    value_per_day: {
        type: String,
        required: [true, 'Please enter client is qualified'],
    },
});

export default mongoose.model<ICar>('Car', CarSchema);