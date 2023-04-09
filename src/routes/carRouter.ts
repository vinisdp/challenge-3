import { Router } from 'express';
import authController from '../controllers/authController';

export const carRouter = Router();

carRouter.post('/', authController.protect);
carRouter.get('/');
carRouter.delete('/:id');
carRouter.patch('/:id', authController.protect);
