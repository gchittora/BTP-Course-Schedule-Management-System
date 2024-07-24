const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm=require('passport-local-mongoose')
mongoose.connect("mongodb+srv://gchittora123:HycP9127+@cluster1.3f48jss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
// Professor Model
const professorSchema = new Schema({
    name: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

const Professor = mongoose.model('Professor', professorSchema);
module.exports=Professor;
