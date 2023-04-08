import { Router } from 'express';
import userController from '../controllers/userController';

export const userRouter = Router();

userRouter.post('/signUp');
userRouter.post('/signIn');
userRouter.patch('/', userController.update);
userRouter.delete('/', userController.delete);
