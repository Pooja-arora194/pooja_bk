import Leave from "../model/leave.js"
import cloudinary from "../cloudinary";
import fs from "fs";

export const addLeave =async (req, res) => {
    try {
        const { candidateId ,designation, leaveDate, reason } = req.body;

        let documentPath = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "leave_documents",
                resource_type: "auto",
            });
            documentPath = result.secure_url;

            fs.unlinkSync(req.file.path);
        }

        const leave = new Leave({
            candidateId,
            designation,
            leaveDate,
            reason,
            document: documentPath,
        });

        await leave.save();
        res.status(201).json({ message: "Leave added successfully", leave });
    } catch (err) {
        res.status(500).json({ error: "Failed to add leave" });
    }
};
export const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find()
            .populate("candidateId", "name email phone position")
            .sort({ createdAt: -1 });
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch leaves" });
    }
};
export const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updateFields = { status };

        const updatedLeave = await Leave.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );
        if (!updatedLeave) {
            return res.status(404).json({ error: "Candidate not found" });
        }

        res.status(200).json(updatedLeave);
    } catch (error) {
        res.status(500).json({ error: "Failed to update status" });
    }
};
