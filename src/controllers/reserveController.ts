import { Request, Response, NextFunction } from 'express';
import { IReserve } from '../interfaces/interfaceReserve';
import AppError from '../utils/appErrors';
import ReserveService from '../services/reserveService';
import { validateCreateReserve } from '../validations/reserveValidation';



class ReserveController {
    public async findAll(req: Request, res: Response): Promise<void> {

        const reservations = await ReserveService.findAll();

        res.status(200).json({
            status: 'success',
            results: reservations.length,
            data: {
                data: reservations,
            },
        });
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const reserve = await ReserveService.findById(id);

        if (!reserve) {
            return next(new AppError('No document found with this id', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: reserve,
            },
        });
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const valid = validateCreateReserve(req.body);
        if (valid.error) {
            next(new AppError('Please provide valid informations', 400));
        }

        const reserve = req.body as IReserve;
        const createdReserve = await ReserveService.create(reserve);

        res.status(201).json({
            status: 'success',
            data: {
                data: createdReserve,
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

export default new ReserveController();
