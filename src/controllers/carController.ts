import { Request, Response, NextFunction } from 'express';
import { ICar } from '../interfaces/interfaceCar';
import CarService from '../services/carService';
import AppError from '../utils/appErrors';
import { validateCreateCar } from '../validations/carValidation';


class CarController {
    public async findAll(req: Request, res: Response): Promise<void> {

        const cars = await CarService.findAll();

        res.status(200).json({
            status: 'success',
            results: cars.length,
            data: {
                data: cars,
            },
        });
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const car = await CarService.findById(id);

        if (!car) {
            return next(new AppError('No document found with this id', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: car,
            },
        });
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const valid = validateCreateCar(req.body);
        if (valid.error) {
            next(new AppError('Please provide valid informations', 400));
        }
        const car = req.body as ICar;
        const createdCar = await CarService.create(car);

        res.status(201).json({
            status: 'success',
            data: {
                data: createdCar,
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
