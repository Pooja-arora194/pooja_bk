import Candidates from "../model/candidate.js"

export const addCandidates = async (req, res) => {
    try {
        const { name, email, phone, position, department,experience } = req.body;
        const resume = req.file ? req.file.filename : null;

        const candidate = new Candidates({
            name,
            email,
            phone,
            position,
            department,
            resume,
            experience
        });

        await candidate.save();

        res.status(201).json({ message: "Candidate added successfully", candidate });
    } catch (error) {
        console.error("Error adding candidate:", error);
        res.status(500).json({ message: "Server Error" });
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
