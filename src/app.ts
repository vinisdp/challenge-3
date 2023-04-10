
import { userRouter } from './routes/userRouter';
import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { carRouter } from './routes/carRouter';
import { reserveRouter } from './routes/reserveRouter';

export const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


app.use('/api/v1/users', userRouter);
app.use('/api/v1/car', carRouter);
app.use('/api/v1/reserve', reserveRouter);

app.use(json());

app.use((err: Error, req: Request, res: Response) => {
    res.status(500).json({ message: err.message });
});
