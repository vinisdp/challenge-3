import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appErrors';
import { validateSingIn, validateUser } from '../validations/userValidation';

//Não esquecer de verificar o nome do JWT_SECRET no .env
// const JWT_SECRET = process.env.JWT_SECRET!;
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!;

const signToken = (id: string): string => {
    const token = jwt.sign({ id }, 'plannercompasscap1v4r43xc3pt1i0n', {
        expiresIn: '2h',
    });

    return token;
};

interface JwtPayload {
    id: string;
    iat: number;
    exp: number;
}

interface AuthRequest extends Request {
    user?: any;
}

class AuthController {
    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {

        const valid = validateSingIn(req.body);
        console.log(valid);
        if (valid.error) {
            next(new AppError('Please provide email and password', 400));
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.isCorrectPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password', 401));
        }

        const token = signToken(user._id);

        res.status(200).json({ token });
    };

    public async protect(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {

        let token: string | undefined;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('You are not logged in! Please log in to get access.', 401));
        }

        const decoded = jwt.verify(token, 'plannercompasscap1v4r43xc3pt1i0n') as JwtPayload;

        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            return next(new AppError('The user belonging to this token does no longer exist.', 401));
        }

        // 4) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next(new AppError('User recently changed password! Please log in again.', 401));
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
    };

    public async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        const valid = validateUser(req.body);
        if (valid.error) {
            next(new AppError('Please provide valid informations', 400));
        }
        const newUser = await User.create({
            name: req.body.name,
            cpf: req.body.cpf,
            birth: req.body.birth,
            email: req.body.email,
            password: req.body.password,
            cep: req.body.cep,
            qualified: req.body.qualified,
        });

        const token = signToken(newUser._id);

        // Remove password from output
        newUser.password = '';

        res.status(201).json({
            status: 'success',
            token,
            data: {
                newUser,
            },
        });
    };
}

export default new AuthController();


