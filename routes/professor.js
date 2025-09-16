const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm=require('passport-local-mongoose')

// Professor Model
const professorSchema = new Schema({
    name: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

const Professor = mongoose.model('Professor', professorSchema);
module.exports=Professor;
