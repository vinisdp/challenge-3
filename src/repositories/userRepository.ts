import { IUser } from '../interfaces/interfaceUser';
import User from '../models/userModel';

class UserRepository {

    public async findAll(): Promise<IUser[]> {
        return User.find().exec();
    }

    public async findById(id: string): Promise<IUser | null> {
        return User.findById(id).exec();
    }

    public async create(user: IUser): Promise<IUser> {
        return User.create(user);
    }

    public async update(id: string, user: IUser): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true,
        }).exec();
    }

    public async delete(id: string): Promise<void> {
        await User.findByIdAndDelete(id).exec();
    }
}

export default new UserRepository();
