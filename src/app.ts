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
    public constructor(private readonly config: IConfig) {
        this.apiServer = new ApiServer(config.endpoint.href, config.port);
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

    private createWindow(): void {
        this.apiServer.start();
        // Create the browser window.

        const browserConfig: BrowserWindowConstructorOptions = {
            height: 600,
            icon: __dirname + "/../icon.png",
            minHeight: 480,
            minWidth: 640,
            webPreferences: {
                nodeIntegration: false,
            },
            width: 800,
        };
        this.mainWindow = new BrowserWindow(browserConfig);
        // tslint:disable-next-line:no-null-keyword
        this.mainWindow.setMenu(null);
        // and load the index.html of the app.
        // mainWindow.loadFile(path.join(__dirname, "app/index.html"));
        this.mainWindow.loadURL("http://localhost:" + this.config.port + "/index.html");

        // tslint:disable-next-line:no-console
        if (this.config.dev === true) {
            this.mainWindow.webContents.openDevTools({
                mode: "right",
            });
        }

        // Emitted when the window is closed.
        this.mainWindow.on("closed", () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.mainWindow = undefined;
        });
    }
}
