const { User } = require('../models/userModel.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login Request:', req.body);

        if (!email || !password) {
            return res.status(401).json({
                message: "Invalid data",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const tokenData = { id: user._id, isadmin: user.isadmin };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).cookie("token", token, { httpOnly: true }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            token, 
            success: true
        });

    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


const Logout = async (req, res) => {
    return res.status(200).cookie("token", "", { expires: new Date(Date.now()), httpOnly: true }).json({
        message: "User logged out successfully.",
        success: true,
    });
};

const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        console.log('Register Request:', req.body);

        if (!fullName || !email || !password) {
            return res.status(401).json({
                message: "Invalid data",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "This email is already used",
                success: false,
            });
            
        }

        const hashedPassword = await bcryptjs.hash(password, 16);
        await User.create({ fullName, email, password: hashedPassword });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });

    } catch (error) {
        console.error('Register Error:', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,  // Log the error message
            success: false
        });
    }
};

module.exports = {
    Login,
    Logout,
    Register
};
