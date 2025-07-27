const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const verifiedEmails = require("../models/verifiedEmail");

const JWT_SECRET = process.env.JWT_SECRET;

// Register
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!verifiedEmails.includes(email)) {
        return res.status(400).json({ message: "Email not verified with OTP" });
    }

    try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "student",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "2h",
    });

    res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};

// Get profile (protected)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch profile", error: err.message });
    }
};
