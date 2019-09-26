import { ErrorRequestHandler, Request, Response, NextFunction, RequestHandler } from "express";
export const createApiNotFoundRequestHandler: () => RequestHandler = () => {
    return (req: Request,
        res: Response,
        next: NextFunction) => {
        res.status(404).json({
            statusCode: 404,
        });
    };
};