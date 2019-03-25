import * as req from "request";
import * as reqp from "request-promise-native";

export function getTripPassages(tripId, mode) {
    const options = {
        form: {
            // Like <input type="text" name="name">
            mode,
            tripId,
        },
        headers: {
            "User-Agent": "Request-Promise",
        },
        json: true, // Automatically parses the JSON string in the response
        method: "POST",
        uri: "https://www.kvg-kiel.de/internetservice/services/tripInfo/tripPassages",
    };
    return reqp(options);
}
