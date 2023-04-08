import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    birthDate: Date;
    city: string;
    country: string;
    email: string;
    password: string;
    confirmPassword: string;
    passwordChangedAt: Date;
    isCorrectPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    changedPasswordAfter(this: IUser, JWTTimestamp: number): boolean;
}