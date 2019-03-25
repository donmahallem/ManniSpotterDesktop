import * as req from "request";
import * as reqp from "request-promise-native";

export function getStations() {
    const options = {
        uri: "https://kvg-kiel.de/internetservice/geoserviceDispatcher/services/stopinfo/stops",
        qs: {
            left: -648000000,
            bottom: -324000000,
            right: 648000000,
            top: 324000000,
        },
        headers: {
            "User-Agent": "Request-Promise",
        },
        json: true, // Automatically parses the JSON string in the response
    };
    return reqp(options);
}
