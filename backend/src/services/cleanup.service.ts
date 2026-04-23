import fs from "fs";
import path from "path";

const TTL = 5 * 60 * 1000;

const cleanDirectory = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath);
  const now = Date.now();

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);

    try {
      const stats = fs.statSync(filePath);
      const age = now - stats.mtimeMs;

      if (age > TTL) {
        fs.unlinkSync(filePath);
        console.log("Deleted:", filePath);
      }
    } catch (err) {
      console.error("Cleanup error:", err);
    }
  });
};

export const cleanupOldFiles = () => {
  console.log("Running cleanup job...");

  const processedDir = path.resolve("processed");
  const uploadsDir = path.resolve("uploads");

  cleanDirectory(processedDir);
  cleanDirectory(uploadsDir);
};