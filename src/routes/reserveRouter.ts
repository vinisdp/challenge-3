import { Router } from 'express';
import authController from '../controllers/authController';
import reserveController from '../controllers/reserveController';

export const reserveRouter = Router();

reserveRouter.post('/', authController.protect, reserveController.create);
reserveRouter.get('/', authController.protect, reserveController.findAll);
reserveRouter.get('/:id', authController.protect, reserveController.findById);
reserveRouter.delete('/:id', authController.protect, reserveController.deleteById);
reserveRouter.patch('/:id', authController.protect);