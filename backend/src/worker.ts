import { Worker } from "bullmq";
import IORedis from "ioredis";
import { ImageService } from "./services/image.service";
import fs from "fs"

const connection = new IORedis({
    host: process.env.REDIS_HOST || "localhost",
    port: 6379,
    maxRetriesPerRequest: null,
});

const imageService = new ImageService();

const worker = new Worker(
    "image-processing",
    async (job) => {
        const { type, filePath, options } = job.data;
        console.log(`Processing job ${job.id}`);

        try {
            if (!fs.existsSync(filePath)) {
                throw new Error("Input file not found");
            }

            const result = await imageService.processImage(type, filePath, options);

            return result;
        } catch (error: any) {
            console.error(`Job ${job.id} failed inside processor:`, error.message);
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, () => { });
            }

            throw error;
        }
    },
    {
        connection,
        concurrency: 2,
    }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed after retries:`, err.message);
});

worker.on("error", (err) => {
  console.error("🚨 Worker crashed:", err);
});