import { Request, Response, NextFunction } from 'express';
import { IReserve } from '../interfaces/interfaceReserve';
import AppError from '../utils/appErrors';



class CarController {
    public async findAll(req: Request, res: Response): Promise<void> {

        const events = await ReserveService.findAll();

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
        const event = await ReserveService.findById(id);

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
        const event = req.body as IReserve;
        const createdEvent = await ReserveService.create(event);

        res.status(201).json({
            status: 'success',
            data: {
                data: createdEvent,
            },
        });
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const doc = await ReserveService.deleteById(id);

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
