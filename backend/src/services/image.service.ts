import sharp from "sharp";
import path from "path";
import fs from "fs";

interface ImageOptions {
  filePath: string;
  options: {
    width?: number;
    height?: number;
    quality?: number;
  };
}

const ensureProcessedDir = () => {
  if (!fs.existsSync("processed")) {
    fs.mkdirSync("processed");
  }
};

class ImageCompressService {
  async process(image: ImageOptions) {
    const quality = Number(image.options.quality) || 80;
    const fileName = path.basename(image.filePath);

    const outputFileName = `${Date.now()}-${fileName}`;
    const outputPath = path.join("processed", outputFileName);

    ensureProcessedDir();

    await sharp(image.filePath)
      .jpeg({ quality })
      .toFile(outputPath);

    return { outputPath };
  }
}

class ImageResizeService {
  async process(image: ImageOptions) {
    const width = Number(image.options.width);
    const height = Number(image.options.height);

    const fileName = path.basename(image.filePath);
    const outputFileName = `${Date.now()}-${fileName}`;
    const outputPath = path.join("processed", outputFileName);

    ensureProcessedDir();

    await sharp(image.filePath)
      .resize(width, height)
      .toFile(outputPath);

    return { outputPath };
  }
}

export class ImageService {
  private compressService = new ImageCompressService();
  private resizeService = new ImageResizeService();

  async processImage(
    type: string,
    filePath: string,
    options: any
  ) {
    const payload: ImageOptions = { filePath, options };

    if (type === "compress") return this.compressService.process(payload);
    if (type === "resize") return this.resizeService.process(payload);

    throw new Error("Invalid job type");
  }
}