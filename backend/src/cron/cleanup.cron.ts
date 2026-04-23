import cron from "node-cron";
import { cleanupOldFiles } from "../services/cleanup.service";

export const startCleanupCron = () => {
  cron.schedule("* * * * *", () => {
    cleanupOldFiles();
  });

  console.log("Cleanup cron started");
};