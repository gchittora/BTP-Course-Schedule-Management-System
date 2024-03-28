const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the course schema
const courseSchema = new Schema({
    name: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String },
    courseCode: { type: String }, // Modified field name
    numberOfStudents: {
        type: Map,
        of: Number,
        required: true,
        validate: {
            validator: function(v) {
                let sum = 0;
                for (const value of Object.values(v)) {
                    if (typeof value !== 'number' || value < 0) {
                        return false;
                    }
                    sum += value;
                }
                return sum > 0;
            },
            message: 'Invalid number of students'
        }
    },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'Professor' },
    methodOfDelivery: { type: String, enum: ['horizontal', 'vertical'] },
    credits: { type: Number },
    professors: [{ type: Schema.Types.ObjectId, ref: 'Professor' }]
});

// Create and export the Course model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
