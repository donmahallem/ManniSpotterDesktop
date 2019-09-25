/*!
 * Source https://github.com/donmahallem/TrapezeClientElectron
 */

/*!
 * Source https://github.com/donmahallem/TrapezeApiExpressRoute
 */

import * as crypto from "crypto";
import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import { ApiServer } from "./api-server";
import { ArgsCallback, IConfig } from "./cli-commands";

export const AppCallback: ArgsCallback = (config: IConfig) => {
    const trapezeApp: TrapezeApp = new TrapezeApp(config);
    trapezeApp.init();
};
export class TrapezeApp {

    private mainWindow: Electron.BrowserWindow;
    private apiServer: ApiServer;
    private secureToken: string;
    public constructor(private readonly config: IConfig) {
        this.secureToken = this.createSecureToken();
        this.apiServer = new ApiServer({
            endpoint: config.endpoint.href,
            port: config.port,
            secret: this.secureToken,
        });
    }

    /**
     * creates a random string
     */
    public createSecureToken(): string {
        return crypto.randomBytes(64).toString("hex");
    }

    public init(): void {
        app.on("ready", this.createWindow.bind(this));

        app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                app.quit();
                this.apiServer.stop();
            }
        });

        app.on("activate", () => {
            if (this.mainWindow === null) {
                this.createWindow();
            }
        });
    }

    public setupNetworkInterceptors(session: Electron.Session): void {
        const filter: Electron.OnBeforeSendHeadersFilter = {
            urls: [
                "*://localhost/*",
            ],
        };
        session.webRequest
            .onBeforeSendHeaders(filter, (details: Electron.OnBeforeSendHeadersDetails, callback) => {
                // tslint:disable-next-line:no-string-literal
                details.requestHeaders["Authorization"] = "Bearer " + this.secureToken;
                callback({ cancel: false, requestHeaders: details.requestHeaders });
            });
    }

    private createWindow(): void {
        this.apiServer.start();
        // create the browser window.

        const browserConfig: BrowserWindowConstructorOptions = {
            height: 600,
            icon: __dirname + "/../icon.png",
            minHeight: 480,
            minWidth: 640,
            title: "TrapezeClient",
            webPreferences: {
                allowRunningInsecureContent: true,
                javascript: true,
                nodeIntegration: false,
            },
            width: 800,
        };
        this.mainWindow = new BrowserWindow(browserConfig);
        // tslint:disable-next-line:no-null-keyword
        this.mainWindow.setMenu(null);
        this.mainWindow.loadURL("http://localhost:" + this.config.port + "/index.html");

        // tslint:disable-next-line:no-console
        if (this.config.dev) {
            this.mainWindow.webContents.openDevTools({
                mode: "right",
            });
        }

        // emitted when the window is closed.
        this.mainWindow.on("closed", () => {
            // dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.mainWindow = undefined;
        });
        // register Token Interceptor
        this.setupNetworkInterceptors(this.mainWindow.webContents.session);
    }
}
