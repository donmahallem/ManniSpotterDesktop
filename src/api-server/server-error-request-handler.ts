import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
export const createErrorRequestHandler: () => ErrorRequestHandler = () => {
    return (err: any,
        req: Request,
        res: Response,
        next: NextFunction) => {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: true });
    };
};