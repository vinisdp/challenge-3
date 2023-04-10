import { IUser } from '../interfaces/interfaceUser';
import userRepository from '../repositories/userRepository';



class UserService {
    public async findAll(): Promise<IUser[]> {
        return userRepository.findAll();
    }

    public async findById(id: string): Promise<IUser | null> {
        return userRepository.findById(id);
    }

    public async create(user: IUser): Promise<IUser> {
        return userRepository.create(user);
    }

    public async update(id: string, user: IUser): Promise<IUser | null> {
        return userRepository.update(id, user);
    }

    public async delete(id: string): Promise<void> {
        return userRepository.delete(id);
    }
}

export default new UserService();
