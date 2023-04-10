import { ICar } from "../interfaces/interfaceCar";
import CarRepository from "../repositories/carRepository";


class CarService {
    public async findAll(): Promise<ICar[]> {
        return CarRepository.findAll();
    }

    public async findById(id: string): Promise<ICar | null> {
        return CarRepository.findById(id);
    }

    public async create(event: ICar): Promise<ICar> {
        return CarRepository.create(event);
    }

    public async deleteById(id: string): Promise<any> {
        return CarRepository.delete(id);
    }
}

export default new CarService();
