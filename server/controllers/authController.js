const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../schemas/user');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const JWT_EXPIRATION_NUM = process.env.JWT_EXPIRATION_NUM;
const NODE_ENV = process.env.NODE_ENV;


const signJwt = (id) => {
    return jwt.sign(
        { id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES
    });
};

const sendToken = (user, statusCode, req, res) => {
    const token = signJwt(user._id);
    const options = {
        expires: new Date(Date.now() + JWT_EXPIRATION_NUM),
        secure: NODE_ENV === 'production' ? true : false,
        httpOnly: NODE_ENV === 'production' ? true : false,
    };
    res.cookie('jwt', token, options);
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        user,
    });
}

const encryptPw = async (password) => {
    return await bcrypt.hash(password, 12);
};

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    const pw = await encryptPw(password);
    console.log("signup!");
    try {
        const newUser = await User.create({
            email, password: pw
        });
        sendToken(newUser, 201, req, res);
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("login!");

    try {
        const user = await User.findOne({ email }).select("+password");
        const compared = await bcrypt.compare(password, user.password);
        compared ? sendToken(user, 200, req, res) : res.status(400).json({ message: "login failed" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}