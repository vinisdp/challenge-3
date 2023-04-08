import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/interfaceUser';

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
    },
    birthDate: {
        type: Date,
        required: [true],
    },
    city: {
        type: String,
        required: [true, 'Please enter your city'],
    },
    country: {
        type: String,
        required: [true, 'Please enter your country'],
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
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        select: false,
    },
    passwordChangedAt: Date,
});

UserSchema.pre<IUser>('save', async function (next) {
    // Oly run this fucntion if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.confirmPassword = '';
    next();
});

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.passwordChangedAt = new Date(Date.now() - 1000);
    next();
});

UserSchema.methods.isCorrectPassword = async function (candidatePassword: string, userPassword: string) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (this: IUser, JWTTimestamp: number) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), 10);
        return JWTTimestamp < changedTimestamp;
    }

    // FALSE means not changed
    return false;
};
export default mongoose.model<IUser>('User', UserSchema);