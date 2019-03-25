import * as req from "request";
import * as reqp from "request-promise-native";

export function getStations() {
    const options = {
        headers: {
            "User-Agent": "Request-Promise",
        },
        json: true, // Automatically parses the JSON string in the response
        qs: {
            bottom: -324000000,
            left: -648000000,
            right: 648000000,
            top: 324000000,
        },
        uri: "https://kvg-kiel.de/internetservice/geoserviceDispatcher/services/stopinfo/stops",
    };
    return reqp(options);
}
