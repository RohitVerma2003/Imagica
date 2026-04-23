import { Request, Response } from "express";
import { imageQueue } from "../config/queue";

export const getJobStatus = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;

    const job = await imageQueue.getJob(String(jobId));

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const state = await job.getState();

    return res.status(200).json({
      jobId: job.id,
      state,
      result: job.returnvalue || null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching job", error });
  }
};