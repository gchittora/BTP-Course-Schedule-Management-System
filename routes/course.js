const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the course schema
const courseSchema = new Schema({
    name: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String,  },
    numberOfStudents: { type: Number, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'Professor' },
    methodOfDelivery: { type: String, enum: ['horizontal', 'vertical'] }
});

// Create and export the Course model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;