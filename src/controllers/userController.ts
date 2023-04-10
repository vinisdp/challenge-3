import { Request, Response } from 'express';
import UserService from '../services/userService';
import { IUser } from '../interfaces/interfaceUser';


class UserController {
    public async findAll(req: Request, res: Response): Promise<void> {
        const users = await UserService.findAll();
        res.status(200).json(users);
    }

    public async findById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await UserService.findById(id);
        if (!user) {
            res.status(404).send();
            return;
        }
        res.status(200).json(user);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const user = req.body as IUser;
        const createdUser = await UserService.create(user);
        res.status(201).json(createdUser);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = req.body as IUser;
        const updatedUser = await UserService.update(id, user);
        if (!updatedUser) {
            res.status(404).send();
            return;
        }
        res.status(200).json(updatedUser);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await UserService.delete(id);
        res.status(204).send();
    }
}

export default new UserController();