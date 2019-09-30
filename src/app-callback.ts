/*!
 * Source https://github.com/donmahallem/TrapezeClientElectron
 */

import { TrapezeApp } from "./app";
import { ArgsCallback, IConfig } from "./cli-commands";

export const AppCallback: ArgsCallback = (config: IConfig) => {
    const trapezeApp: TrapezeApp = new TrapezeApp(config);
    trapezeApp.init()
        .then(() => {
            // tslint:disable-next-line:no-console
            console.log("App started");
        })
        .catch((err: any) => {
            // tslint:disable-next-line:no-console
            console.error("Error occured during startup", err);
        });
};
