import sharp from "sharp";
import path from "path";
import fs from "fs";
import { ImageOptions } from "../types/image.types";

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

class ImageCropService {
  async process(image: ImageOptions) {
    const { x = 0, y = 0, width, height } = image.options;

    if (!width || !height) {
      throw new Error("Width and height are required for crop");
    }

    const metadata = await sharp(image.filePath).metadata();

    const imgWidth = metadata.width || 0;
    const imgHeight = metadata.height || 0;

    if (!imgWidth || !imgHeight) {
      throw new Error("Invalid image metadata");
    }

    let left = Math.round(Number(x));
    let top = Math.round(Number(y));
    let cropWidth = Math.round(Number(width));
    let cropHeight = Math.round(Number(height));

    left = Math.max(0, Math.min(left, imgWidth - 1));
    top = Math.max(0, Math.min(top, imgHeight - 1));

    cropWidth = Math.max(1, Math.min(cropWidth, imgWidth - left));
    cropHeight = Math.max(1, Math.min(cropHeight, imgHeight - top));

    const outputPath = `processed/${Date.now()}-crop.jpg`;

    await sharp(image.filePath)
      .extract({
        left,
        top,
        width: cropWidth,
        height: cropHeight,
      })
      .toFile(outputPath);

    return { outputPath };
  }
}

class ImageGrayscaleService {
  async process(image: ImageOptions) {
    const outputPath = `processed/${Date.now()}-grayscale.jpg`;

    await sharp(image.filePath)
      .grayscale()
      .toFile(outputPath);

    return { outputPath };
  }
}

class ImageRotateService {
  async process(image: ImageOptions) {
    const angle = Number(image.options.angle) || 90;

    const outputPath = `processed/${Date.now()}-rotate.jpg`;

    await sharp(image.filePath)
      .rotate(angle)
      .toFile(outputPath);

    return { outputPath };
  }
}

class ImageConvertService {
  async process(image: ImageOptions) {
    const format = image.options.format || "jpeg";

    const outputPath = `processed/${Date.now()}-convert.${format}`;

    await sharp(image.filePath)
      .toFormat(format)
      .toFile(outputPath);

    return { outputPath };
  }
}

export class ImageService {
  private compressService = new ImageCompressService();
  private resizeService = new ImageResizeService();
  private cropService = new ImageCropService();
  private grayscaleService = new ImageGrayscaleService();
  private rotateService = new ImageRotateService();
  private convertService = new ImageConvertService();

  async processImage(type: string, filePath: string, options: any) {
    const payload = { filePath, options };

    switch (type) {
      case "compress":
        return this.compressService.process(payload);

      case "resize":
        return this.resizeService.process(payload);

      case "crop":
        return this.cropService.process(payload);

      case "grayscale":
        return this.grayscaleService.process(payload);

      case "rotate":
        return this.rotateService.process(payload);

      case "convert":
        return this.convertService.process(payload);

      default:
        throw new Error("Invalid job type");
    }
  }
}