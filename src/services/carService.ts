import { ICar } from "../interfaces/interfaceCar";
import carRepository from "../repositories/carRepository";


class EventService {
    public async findAll(): Promise<ICar[]> {
        return carRepository.findAll();
    }

    public async findById(id: string): Promise<ICar | null> {
        return carRepository.findById(id);
    }

    public async create(event: ICar): Promise<ICar> {
        return carRepository.create(event);
    }

    public async deleteById(id: string): Promise<any> {
        return carRepository.delete(id);
    }
}

export default new EventService();
