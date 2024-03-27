const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: { type: String, required: true },
    hod: { type: Schema.Types.ObjectId, ref: 'Professor' }, // Head of Department
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

const Department = mongoose.model('Department', departmentSchema);

module.exports=Department;