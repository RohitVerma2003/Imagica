import { Request, Response, NextFunction } from "express";

export const validateImageRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { type, width, height, quality, format, angle } = req.body;

    if (!type || !["compress", "resize", "crop", "grayscale", "rotate", "convert"].includes(type)) {
        return res.status(400).json({
            message: "Invalid type. Use 'compress' or 'resize'",
        });
    }

    if (type === "compress") {
        if (quality && (quality < 1 || quality > 100)) {
            return res.status(400).json({
                message: "Quality must be between 1 and 100",
            });
        }
    }

    if (type === "resize") {
        if (!width || !height) {
            return res.status(400).json({
                message: "Width and height are required for resize",
            });
        }

        if (width <= 0 || height <= 0) {
            return res.status(400).json({
                message: "Width and height must be positive",
            });
        }
    }

    if (type === "crop") {
        if (!width || !height) {
            return res.status(400).json({
                message: "Width and height required for crop",
            });
        }
    }

    if (type === "rotate") {
        if (!angle) {
            return res.status(400).json({
                message: "Angle required",
            });
        }
    }

    if (type === "convert") {
        if (!["jpeg", "png", "webp"].includes(format)) {
            return res.status(400).json({
                message: "Invalid format",
            });
        }
    }

    next();
};