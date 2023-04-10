import { IReserve } from "../interfaces/interfaceReserve";
import Reserve from '../models/reserveModel';


class ReserveRepository {

    public async findAll(): Promise<IReserve[]> {
        return Reserve.find().exec();
    }

    public async findById(id: string): Promise<IReserve | null> {
        return Reserve.findById(id).exec();
    }

    public async create(car: IReserve): Promise<IReserve> {
        return Reserve.create(car);
    }

    public async update(id: string, car: IReserve): Promise<IReserve | null> {
        return Reserve.findByIdAndUpdate(id, car, {
            new: true,
            runValidators: true,
        }).exec();
    }

    public async delete(id: string): Promise<void> {
        await Reserve.findByIdAndDelete(id).exec();
    }
}

export default new ReserveRepository();
