const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm=require('passport-local-mongoose')
// Lecture Hall Model
const lectureHallSchema = new Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true }
});

const LectureHall = mongoose.model('LectureHall', lectureHallSchema);
module.exports=LectureHall;