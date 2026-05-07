import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// ================= TOKEN CREATION =================

// user token
const createUserToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// admin token
const createAdminToken = () => {
    return jwt.sign({ role: "admin" }, process.env.JWT_SECRET);
};


// ================= USER LOGIN =================
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createUserToken(user._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// ================= USER REGISTER =================
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // check existing user
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter valid email" });
        }

        // validate password
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = createUserToken(user._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// ================= ADMIN LOGIN =================
const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {

            // ✅ FIXED: role-based token
            const token = createAdminToken();

            res.json({ success: true, token });

        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// ================= EXPORT =================
export {
    loginUser,
    registerUser,
    adminLogin
};