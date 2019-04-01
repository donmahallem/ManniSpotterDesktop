import { createTrapezeApiRoute } from "@donmahallem/trapeze-api-express-route";
import * as express from "express";
import * as helmet from "helmet";
import { Server } from "http";
export const api404Handler: express.RequestHandler = (req: express.Request,
                                                      res: express.Response,
                                                      next: express.NextFunction): void => {
    res.status(404).json({
        statusCode: 404,
    });
};
export const serverErrorHandler: express.ErrorRequestHandler = (err: any,
                                                                req: express.Request,
                                                                res: express.Response,
                                                                next: express.NextFunction) => {
    // tslint:disable-next-line:no-console
    console.error(err);
};
export class ApiServer {
    private app: express.Application;
    private server: Server;
    constructor(endpoint: string) {
        this.app = express();
        this.app.use(helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
            },
        }));
        this.app.use("/api", createTrapezeApiRoute(endpoint));
        this.app.use("/api", api404Handler);
        this.app.use(express.static(__dirname + "/app"));
        this.app.get("/*", (req, res) => {
            res.sendFile(__dirname + "/app/index.html");
        });
        this.app.use(serverErrorHandler);
    }

    public start() {
        this.app.use(require("./server/api-routes"));
        this.server = this.app.listen(9482);
    }

    public stop() {
        this.server.close((err) => {
            // tslint:disable-next-line:no-console
            console.log("Server closed", err);
        });
    }
}
