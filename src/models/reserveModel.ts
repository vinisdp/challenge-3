import mongoose, { Schema } from 'mongoose';
import { IReserve } from '../interfaces/interfaceReserve';

const ReserveSchema = new Schema({
    start_date: {
        type: String,
        required: [true, 'Please enter valid date'],
    },
    end_date: {
        type: String,
        required: [true, 'Please enter valid date'],
    },

});

export default mongoose.model<IReserve>('Car', ReserveSchema);