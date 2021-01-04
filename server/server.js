import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();

dotenv.config();

app.enable('trust proxy');

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());

app.use('api/v1/auth',authRoutes)
const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('conected to database !!!!!'))
    .catch((error) => console.log(error));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));