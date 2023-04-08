import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

process.on('uncaughtException', (err: Error) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL!;

mongoose.connect(DB).then(() => console.log('DB connected'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err: Error) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => process.exit(1));
});
