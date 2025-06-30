import mongoose from 'mongoose';
const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String,  },
    department: { type: String, },
    experience: { type: String,},
    resume: { type: String },
    status: { type: String , default :'New'},
    attendance: { type: String , },
    joiningDate: { type: Date,},
}, { timestamps: true });

export default mongoose.model('Candidate', candidateSchema);
