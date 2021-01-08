const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../schemas/user');
const dotenv = require('dotenv');
const { promisify } = require('util');
const DBError = require('../utils/DBEror');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const JWT_EXPIRATION_NUM = process.env.JWT_EXPIRATION_NUM;
const NODE_ENV = process.env.NODE_ENV;

//JWT

const decryptJwt = async (token) => {
    const jwtVerify = promisify(jwt.verify);
    try {
        return await jwtVerify(token, JWT_SECRET);
    } catch (error) {
        console.log(error);
    }
};

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

//API
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
        let errorHandled = error;
        if (error.name === 'MongoError') errorHandled = DBError(error);
        res.status(200).json({ message: errorHandled.message });
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
        res.status(400).json({ message: error });
    }
}

exports.logout = async (req, res) => {
    const options = {
        expires: new Date(Date.now() + 10000),
        secure: NODE_ENV === 'production' ? true : false,
        httpOnly: NODE_ENV === 'production' ? true : false,
    };
    res.cookie('jwt', 'expiredtoken', options);
    res.status(200).json({ status: 'success' });
};

exports.secretcontent = (req, res) => {
    console.log("requser", req.user);
    res.status(200).json({ status: 'success secret content shown' });
};

//Middleware

exports.secure = async (req, res, next) => {
    let token;
    if (req.cookies) token = req.cookies.jwt;
    if (!token || token === 'expiredtoken') {
        console.log(token);
        return res.status(401).json({
            status: 'unauthorized',
            message: 'you are not authorized to view this content'
        });
    }
    const jwtInfo = await decryptJwt(token);
    console.log(jwtInfo);
    const user = await User.findById(jwtInfo.id);
    if (!user) {
        return res.status(401).json({
            status: 'unauthorized',
            message: 'you are not authorized to view this content'
        });
    }
    req.user = user;
    next();
}

exports.clearanceLevel = (...clearanceLevel) => {
    return (req, res, next) => {
        clearanceLevel.includes(req.user.clearance)
            ? next()
            : res.status(200).json({
                status: 'unauthorized',
                message: 'content not available at your clearence level',
            });
    }
}

exports.blackList = (...inputs) => {
    return (req, res, next) => {
        const { body } = req;
        console.log(body);
        let bodyProps;
        for (const prop in inputs) {
            bodyProps = inputs[prop];
            if (body[bodyProps]) delete body[bodyProps];
        }
        console.log(req.body);
        next();
    }
}