const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');

const app = express();

dotenv.config();

app.enable('trust proxy');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(bodyParser.json());

app.use('/api/v1/auth', authRoutes)
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