import Candidates from "../model/candidate.js"
import cloudinary from '../cloudinary.js';
import fs from 'fs';
export const addCandidates = async (req, res) => {
    try {
        let resumeUrl = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "resumes",
                resource_type: "auto",
            });
            resumeUrl = result.secure_url;

            fs.unlinkSync(req.file.path);
        }

        const candidate = new Candidates({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            status: req.body.status,
            resume: resumeUrl,
            dateOfJoining: req.body.dateOfJoining,
        });

        await candidate.save();
        res.status(201).json({ message: "Candidate added", candidate });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong while uploading" });
    }
};
export const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidates.find().sort({ createdAt: -1 });
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch candidates" });
    }
};
export const updateCandidateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updateFields = { status };
        if (status == "Selected") {
            updateFields.joiningDate = new Date();
        }
        const updatedCandidate = await Candidates.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );
        if (!updatedCandidate) {
            return res.status(404).json({ error: "Candidate not found" });
        }

        res.status(200).json(updatedCandidate);
    } catch (error) {
        console.error("Status update error:", error);
        res.status(500).json({ error: "Failed to update status" });
    }
};
export const updateCandidateAttendanceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { attendance } = req.body;

        const updateFields = { attendance };

        const updatedCandidate = await Candidates.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );
        if (!updatedCandidate) {
            return res.status(404).json({ error: "Candidate not found" });
        }

        res.status(200).json(updatedCandidate);
    } catch (error) {
        console.error("Status update error:", error);
        res.status(500).json({ error: "Failed to update status" });
    }
};
export const updateCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updated = await Candidates.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) {
            return res.status(404).json({ error: "Candidate not found" });
        }

        res.status(200).json({ message: "Candidate updated successfully", updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update candidate" });
    }
};
export const deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCandidate = await Candidates.findByIdAndDelete(id);
        if (!deletedCandidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        res.status(200).json({ message: "Candidate deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error while deleting candidate" });
    }
};
