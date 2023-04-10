import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/interfaceUser';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    cpf: {
        type: String,
        required: [true, 'Please enter your cpf'],
    },
    birth: {
        type: Date,
        required: [true],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minLenght: 8,
        select: false,
    },
    cep: {
        type: String,
        required: [true, 'Please enter your cep'],
    },
    qualified: {
        type: String,
        required: [true, 'Please enter client is qualified'],
    },
});

UserSchema.pre<IUser>('save', async function (next) {
    // Oly run this fucntion if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    next();
});

UserSchema.methods.isCorrectPassword = async function (candidatePassword: string, userPassword: string) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model<IUser>('User', UserSchema);