const express = require("express");
const router = express.Router();
const VerifiedEmail = require('../models/verifiedEmail');

const {
    login,
    register,
    getProfile,
} = require("../Controllers/user.controller");

const {
    sendOTP,
    verifyOTP,
} = require("../Controllers/otp.controller");

const { authenticate } = require("../middlewares/auth.middleware");


router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);


router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);


router.get('/verified-emails', async (req, res) => {
    try {
        const emails = await VerifiedEmail.find();
        res.status(200).json(emails);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching verified emails' });
    }
});

module.exports = router;
