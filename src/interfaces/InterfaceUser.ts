import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    cpf: string;
    birth: Date;
    email: string;
    password: string;
    cep: string;
    qualified: string;
    passwordChangedAt: Date;
    isCorrectPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    changedPasswordAfter(this: IUser, JWTTimestamp: number): boolean;
}