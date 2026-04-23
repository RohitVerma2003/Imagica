import sharp from "sharp";
import path from "path";
import fs from "fs";

export const processImage = async (
  type: string,
  filePath: string,
  options: any
) => {
  const fileName = path.basename(filePath);

  const outputFileName = `${Date.now()}-${fileName}`;
  const outputPath = path.join("processed", outputFileName);

  if (!fs.existsSync("processed")) {
    fs.mkdirSync("processed");
  }

  if (type === "compress") {
    const quality = Number(options.quality) || 80;

    await sharp(filePath)
      .jpeg({ quality })
      .toFile(outputPath);

    return { outputPath };
  }

  if (type === "resize") {
    const width = Number(options.width);
    const height = Number(options.height);

    await sharp(filePath)
      .resize(width, height)
      .toFile(outputPath);

    return { outputPath };
  }

  throw new Error("Invalid job type");
};