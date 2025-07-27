const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    username: { type: String, minLength: 2, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    teachingCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);
