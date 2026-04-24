export type ImageType =
    | "compress"
    | "resize"
    | "crop"
    | "grayscale"
    | "rotate"
    | "convert";

export interface ImageOptions {
    filePath: string;
    options: {
        width?: number;
        height?: number;
        quality?: number;
        x?: number;
        y?: number;
        angle?: number;
        format?: "jpeg" | "png" | "webp";
    }
}