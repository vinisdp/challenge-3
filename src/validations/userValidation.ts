import Joi from 'joi';
import { IUser } from '../interfaces/interfaceUser';

export const validateSingIn = (singIn: { email: string, password: string }) => {
    const singUpSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    })

    return singUpSchema.validate(singIn);
}

export const validateUser = (user: IUser) => {

    const userSchema = Joi.object<IUser>({
        name: Joi.string().required(),
        cpf: Joi.string().min(11).max(14).required(),
        birth: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        cep: Joi.string().min(8).max(9).required(),
        qualified: Joi.string().min(3).max(3).required(),
    });

    return userSchema.validate(user);
}