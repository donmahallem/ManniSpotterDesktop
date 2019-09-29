/*!
 * Source https://github.com/donmahallem/TrapezeClientElectron
 */

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
export const createErrorRequestHandler: () => ErrorRequestHandler = () =>
    (err: any,
            req: Request,
            res: Response,
            next: NextFunction) => {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: true });
    };
