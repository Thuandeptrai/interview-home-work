const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { successResponse } = require('../utils/response');

const saltRounds = process.env.SALT_ROUNDS || 10;

const createUser = async (req, res) => {
    try {
        const { username, password, name, dob } = req.body;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const findUser = await User.find({ username });
        if (findUser.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const user = await User.create({ username, password: hashPassword, name, dob });
        // remove password from response
        user.password = undefined;
        // create token
        console.log(process.env.JWT_SECRET);
        const jwtKey = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json(successResponse({
            user,
            token: jwtKey,
        }, 'Create user successfully'));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const findUser = await User.findOne({ username });
        if(!findUser) {
            return res.status(400).json({ message: 'Username does not exist' });
        }
        const isMatch = await bcrypt.compare(password, findUser.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Wrong password' });
        }
        // remove password from response
        findUser.password = undefined;
        // create token
        const jwtKey = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json(successResponse({
            user: findUser,
            token: jwtKey,
        }, 'Login successfully'));

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    login,
};