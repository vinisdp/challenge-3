import { IReserve } from "../interfaces/interfaceReserve";
import ReserveRepository from "../repositories/reserveRepository";

class ReserveService {
    public async findAll(): Promise<IReserve[]> {
        return ReserveRepository.findAll();
    }

    public async findById(id: string): Promise<IReserve | null> {
        return ReserveRepository.findById(id);
    }

    public async create(event: IReserve): Promise<IReserve> {
        return ReserveRepository.create(event);
    }

    public async deleteById(id: string): Promise<any> {
        return ReserveRepository.delete(id);
    }
}

export default new ReserveService();
