import * as req from "request";
import * as reqp from "request-promise-native";

export function getRouteByVehicleId(vehicleId) {
    const options = {
        method: "POST",
        uri: "https://www.kvg-kiel.de/internetservice/geoserviceDispatcher/services/pathinfo/vehicle",
        query: {
            // Like <input type="text" name="name">
            id: vehicleId,
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

export function getRouteByTripId(vehicleId) {
    const options = {
        method: "POST",
        uri: "https://www.kvg-kiel.de/internetservice/geoserviceDispatcher/services/pathinfo/trip",
        qs: {
            // Like <input type="text" name="name">
            id: vehicleId,
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
