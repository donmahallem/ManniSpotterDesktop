import * as req from "request";
import * as reqp from "request-promise-native";

export function getStopDepartures(stopId) {
    const options = {
        form: {
            // Like <input type="text" name="name">
            mode: "departure",
            stop: stopId,
        },
        headers: {
            "User-Agent": "Request-Promise",
        },
        json: true,
        method: "POST",
        uri: "https://www.kvg-kiel.de/internetservice/services/passageInfo/stopPassages/stop",
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

export function getStopDepartures2(stopId) {
    const options = {
        form: {
            // Like <input type="text" name="name">
            mode: "departure",
            stop: stopId,
        },
        headers: {
            // 'Referer': "https://www.kvg-kiel.de/fahrplan/echtzeit/",
            "User-Agent": "Request-Promise",
            // 'Origin': 'https://www.kvg-kiel.de'
        },
        json: true, // Automatically parses the JSON string in the response
        method: "POST",
        uri: "https://www.kvg-kiel.de/internetservice/services/stopInfo/stop",

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

export function getStopDepartures3(stopId) {
    const options = {
        form: {
            // Like <input type="text" name="name">
            mode: "departure",
            stopPoint: stopId,
        },
        headers: {
            // 'Referer': "https://www.kvg-kiel.de/fahrplan/echtzeit/",
            "User-Agent": "Request-Promise",
            // 'Origin': 'https://www.kvg-kiel.de'
        },
        json: true, // Automatically parses the JSON string in the response
        method: "POST",
        uri: "https://www.kvg-kiel.de/internetservice/services/stopInfo/stopPoint",
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
