const otps = require("../models/otp");
const verifiedEmails = require("../models/verifiedEmail");
const sendEmail = require('../utils/sendEmail');


const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (req, res) => {
    const { email } = req.body;
    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 دقايق

    try {
        await Otp.findOneAndUpdate(
        { email },
        { code: otpCode, expiresAt },
        { upsert: true, new: true }
        );

        await sendEmail(email, "Your OTP Code", `Your OTP is: ${otpCode}`);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error("Send OTP error:", err);
        res.status(500).json({ message: "Failed to send OTP" });
    }
};


const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const otpEntry = await Otp.findOne({ email });

        if (!otpEntry || otpEntry.code !== otp || otpEntry.expiresAt < new Date()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        await VerifiedEmail.findOneAndUpdate(
        { email },
        { email },
        { upsert: true }
        );


        await Otp.deleteOne({ email });

        return res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        console.error('OTP verification error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
    module.exports = {
    sendOTP,
    verifyOTP,
    };

