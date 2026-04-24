import { Request, Response } from "express";
import { imageQueue } from "../config/queue";
import path from 'path';

const queueAddConfig = { attempts: 3, backoff: { type: "exponential", delay: 2000 }, removeOnComplete: { age: 300, count: 100 }, removeOnFail: 120 }

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
            filePath: path.resolve(req.file.path),
            options: {
                width,
                height,
                quality,
            },
        };

        const job = await imageQueue.add("process-image", jobData, queueAddConfig);

        return res.status(200).json({
            message: "Job received",
            jobId: job.id,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error", error });
    }
};