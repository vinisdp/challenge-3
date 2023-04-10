import { Request, Response, NextFunction } from 'express';
import { ICar } from '../interfaces/interfaceCar';
import CarService from '../services/carService';
import AppError from '../utils/appErrors';


class CarController {
    public async findAll(req: Request, res: Response): Promise<void> {

        const events = await CarService.findAll();

        res.status(200).json({
            status: 'success',
            results: events.length,
            data: {
                data: events,
            },
        });
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const event = await CarService.findById(id);

        if (!event) {
            return next(new AppError('No document found with this id', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: event,
            },
        });
    }

    public async create(req: Request, res: Response) {
        const event = req.body as ICar;
        const createdEvent = await CarService.create(event);

        res.status(201).json({
            status: 'success',
            data: {
                data: createdEvent,
            },
        });
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const doc = await CarService.deleteById(id);

        if (!doc) {
            return next(new AppError('No document found with this id', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
}

export default new CarController();
