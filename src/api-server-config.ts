/*!
 * Source https://github.com/donmahallem/TrapezeClientElectron
 */

export interface IApiServerConfig {
    /**
     * Endpoint to be used.
     */
    endpoint: string;
    /**
     * Port to be used for the api server
     */
    port: number;
    /**
     * Secret to be used to authorize api calls
     */
    secret: string;
}
