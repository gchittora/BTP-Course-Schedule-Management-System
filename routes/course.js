const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the course schema
const courseSchema = new Schema({
    name: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String },
    courseCode: { type: String , default: "null" },
    numberOfStudents: {
        CSE: { type: Number, default: 0 },
        CCE: { type: Number, default: 0 },
        ECE: { type: Number, default: 0 },
        CSE_DD: { type: Number, default: 0 },
        ECE_DD: { type: Number, default: 0 },
        MME: { type: Number, default: 0 }
    },
    department: { type: Schema.Types.ObjectId, ref:'Department'}, 
    courseType: { type: String, enum: ['Core','Elective','Other']},
    sharingType: { type: String},
    credits: { type: Number },
    professors: [{ type: Schema.Types.ObjectId, ref: 'Professor' }]
});

// Create and export the Course model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
