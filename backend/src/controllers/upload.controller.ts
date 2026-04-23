import { Request, Response } from "express";
import { imageQueue } from "../config/queue";

const queueDeleteConfig = { removeOnComplete: { age: 300, count: 100 }, removeOnFail: 120 }

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const { type, width, height, quality } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        if (!type) {
            return res.status(400).json({ message: "Type is required (compress/resize)" });
        }

        const jobData = {
            type,
            filePath: req.file.path,
            options: {
                width,
                height,
                quality,
            },
        };

        const job = await imageQueue.add("process-image", jobData, queueDeleteConfig);

        return res.status(200).json({
            message: "Job received",
            job: job.id,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error", error });
    }
};