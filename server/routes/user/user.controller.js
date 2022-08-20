const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/user.model");

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please add all fields");
        }

        const userExists = await User.findOne({
            $or: [{ email: email }, { userName: name }],
        });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            userName: name,
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                userName: user.name,
                email: user.email,
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        next(error);
    }
};

const signin = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ userName: name });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user.id,
                userName: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ error: "Invalid credentials." });
        }
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res) => {
    //const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json(req.user);
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    signup,
    signin,
    getMe,
};
