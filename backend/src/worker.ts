import { Worker } from "bullmq";
import IORedis from "ioredis";
import { processImage } from "./services/image.service";

const connection = new IORedis({
    host: process.env.REDIS_HOST || "localhost",
    port: 6379,
    maxRetriesPerRequest: null,
});

const worker = new Worker(
    "image-processing",
    async (job) => {
        console.log("Processing job:", job.id);

        const { type, filePath, options } = job.data;

        const result = await processImage(type, filePath, options);
        return result;
    },
    { connection }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed:`, err);
});