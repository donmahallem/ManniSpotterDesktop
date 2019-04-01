import { app, BrowserWindow } from "electron";
import { ApiServer } from "./api-server";
import { parseArgs, ArgsCallback } from "./cli-commands";
import { AppCallback } from "./app";

const conf = parseArgs(AppCallback);