import { Request, Response, NextFunction } from "express";
import multer from "multer";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            message: err.message,
        });
    }

    if (err) {
        return res.status(400).json({
            message: err.message || "Something went wrong",
        });
    }

    next();
};