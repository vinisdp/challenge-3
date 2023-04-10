import { Router } from 'express';
import authController from '../controllers/authController';
import carController from '../controllers/carController';

export const carRouter = Router();

carRouter.post('/', authController.protect, carController.create);
carRouter.get('/', authController.protect, carController.findAll);
carRouter.get('/:id', authController.protect, carController.findById);
carRouter.delete('/:id', authController.protect, carController.deleteById);
carRouter.patch('/:id', authController.protect);
