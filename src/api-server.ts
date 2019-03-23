import * as express from 'express';
import { Server } from 'http';



export class ApiServer {
    private app: express.Application;
    private server: Server;
    constructor() {
        this.app = express();
    }

    public start() {
        this.app.use(require('./server/api-routes'));
        this.server = this.app.listen(9482);
    }

    public stop() {
        this.server.close((err) => {
            console.log("Server closed", err);
        });
    }
}