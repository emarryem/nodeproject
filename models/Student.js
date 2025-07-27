const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username: { type: String, minLength: 2, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    Grades: [{
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        grade: { type: String, required: true }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
