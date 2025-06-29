import mongoose from 'mongoose';
const LeaveSchema = new mongoose.Schema({
    candidateId: { type: String, ref: "Candidate",},
    leaveDate: Date,
    reason: String,
    document: String,
    status: {type:String, default:'Pending'},
}, { timestamps: true });

export default mongoose.model('Leave', LeaveSchema);
