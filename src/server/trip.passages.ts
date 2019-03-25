import * as req from "request";
import * as reqp from "request-promise-native";

export function getTripPassages(tripId, mode) {
    const options = {
        method: "POST",
        uri: "https://www.kvg-kiel.de/internetservice/services/tripInfo/tripPassages",
        form: {
            // Like <input type="text" name="name">
            mode,
            tripId,
        },
        headers: {
            // 'Referer': "https://www.kvg-kiel.de/fahrplan/echtzeit/",
            "User-Agent": "Request-Promise",
            // 'Origin': 'https://www.kvg-kiel.de'
        },
        json: true, // Automatically parses the JSON string in the response
    };
    /*
    const options = {
        method: 'POST',
        uri: 'https://kvg-kiel.de/internetservice/services/routeInfo/routeStops',
        form: {
            // Like <input type="text" name="name">
            routeId: routeId
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };*/
    return reqp(options);
}
