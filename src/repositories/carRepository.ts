import { ICar } from "../interfaces/interfaceCar";
import Car from '../models/carModel';


class UserRepository {

    public async findAll(): Promise<ICar[]> {
        return Car.find().exec();
    }

    public async findById(id: string): Promise<ICar | null> {
        return Car.findById(id).exec();
    }

    public async create(car: ICar): Promise<ICar> {
        return Car.create(car);
    }

    public async update(id: string, car: ICar): Promise<ICar | null> {
        return Car.findByIdAndUpdate(id, car, {
            new: true,
            runValidators: true,
        }).exec();
    }

    public async delete(id: string): Promise<void> {
        await Car.findByIdAndDelete(id).exec();
    }
}

export default new UserRepository();
