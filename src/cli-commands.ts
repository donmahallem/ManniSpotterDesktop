import * as yargs from 'yargs';

export interface IConfig {
    endpoint: URL;
    dev: boolean;
    port: number;
}
export type ArgsCallback = (IConfig) => void;
export const parseArgs: (cb: ArgsCallback) => void = (cb: ArgsCallback): void => {
    yargs
        .command('$0 [endpoint]', 'endpoint url to query', (ya: yargs.Argv<any>) => {
            return ya
                .positional('endpoint', {
                    describe: 'endpoint url',
                    alias: "endpoint",
                    example: "https://the-domain.com/"
                })
                .option('port', {
                    describe: 'port to bind on',
                    type: "number",
                    default: 9482
                })
                .option('dev', {
                    type: "boolean",
                    default: false
                })
                .coerce('endpoint', (value: string) => {
                    return new URL(value);
                })
                .check((argv: yargs.Arguments<any>, aliases: { [alias: string]: string }) => {
                    return true;
                })
        }, (argv) => {
            cb(argv);
        })
        .argv;
};
