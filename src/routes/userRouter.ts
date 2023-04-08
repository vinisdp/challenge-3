import { Router } from 'express';
import userController from '../controllers/userController';
import authController from '../controllers/authController';

export const userRouter = Router();

userRouter.post('/signUp', authController.signUp);
userRouter.post('/signIn', authController.login);
userRouter.patch('/', authController.protect, userController.update);
userRouter.delete('/', authController.protect, userController.delete);
