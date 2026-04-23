import { Request, Response } from "express";
import { imageQueue } from "../config/queue";
import mime from 'mime-types'
import fs from "fs";
import path from "path";

export const downloadImage = async (req: Request, res: Response) => {
    try {
        let { jobId } = req.params;
        jobId = String(jobId);

        const job = await imageQueue.getJob(jobId);

        if (!job) {
            return res.status(404).json({
                message: "File expired or job not found",
            });
        }

        const state = await job.getState();

        if (state !== "completed") {
            return res.status(400).json({
                message: "File not ready yet",
                state,
            });
        }

        const result = job.returnvalue;

        if (!result?.outputPath) {
            return res.status(500).json({
                message: "Output not available",
            });
        }

        const filePath = path.resolve(result.outputPath);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                message: "File not found on server",
            });
        }

        const fileName = path.basename(filePath);

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${fileName}"`
        );

        const contentType = mime.lookup(filePath) || "application/octet-stream";
        res.setHeader("Content-Type", contentType);

        const fileStream = fs.createReadStream(filePath);

        fileStream.pipe(res);

        fileStream.on("error", (err) => {
            console.error("Stream error:", err);
            res.status(500).end();
        });

    } catch (error) {
        return res.status(500).json({
            message: "Download failed",
            error,
        });
    }
};