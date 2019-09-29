import { ArgsCallback, IConfig } from "./cli-commands";
import { TrapezeApp } from "./app";

export const AppCallback: ArgsCallback = (config: IConfig) => {
    const trapezeApp: TrapezeApp = new TrapezeApp(config);
    trapezeApp.init()
        .then(() => {
            console.log("App started");
        })
        .catch((err: any) => {
            console.error("Error occured during startup", err);
        });
};