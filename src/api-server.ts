import { createTrapezeApiRoute } from "@donmahallem/trapeze-api-express-route";
import * as express from "express";
import { Server } from "http";

export class ApiServer {
    private app: express.Application;
    private server: Server;
    constructor(endpoint: string) {
        this.app = express();
        this.app.use("/api", createTrapezeApiRoute(endpoint));
        this.app.use("/api", (req, res, next) => {
            res.status(404).json({
                statusCode: 404,
            });
        });
        this.app.use(express.static(__dirname + "/app"));
        this.app.get("/*", (req, res) => {
            res.sendFile(__dirname + "/app/index.html");
        });
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
