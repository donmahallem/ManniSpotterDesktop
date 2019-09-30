/*!
 * Source https://github.com/donmahallem/TrapezeClientElectron
 */

import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";
export const createApiNotFoundRequestHandler: () => RequestHandler = () =>
    (req: Request,
     res: Response,
     next: NextFunction) => {
        res.status(404).json({
            statusCode: 404,
        });
    };
