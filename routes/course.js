const mongoose = require('mongoose');
const plm=require('passport-local-mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/pin")
const Schema = mongoose.Schema;
const Department = require('./department');
const LectureHall=require('./lecturehall');
const Professor=require('./professor');
// Course Model
const courseSchema = new Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    semester: { type: Number, required: true },
    numberOfStudents: { type: Number, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'Professor' },
    methodOfDelivery: { type: String, enum: ['horizontal', 'vertical'] }
});

const Course = mongoose.model('Course', courseSchema);


module.exports = { Department, Professor, Course, LectureHall };