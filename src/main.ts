import { app, BrowserWindow } from "electron";
import { ApiServer } from "./api-server";
import { parseArgs, ArgsCallback } from "./cli-commands";
import { AppCallback } from "./app";

console.log(process.argv);
const conf = parseArgs(AppCallback);